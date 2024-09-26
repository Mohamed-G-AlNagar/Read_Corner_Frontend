import { useState, useMemo } from 'react';
import { useDeleteBook, useProducts } from '../../../Hooks/productHooks';
import Spinner from '../../../Components/spinner/Spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  bookCover?: string;
}

const AllBooksTable: React.FC = () => {
  const { products: books, error, isLoading } = useProducts();
  const { mutate: deleteBook } = useDeleteBook();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    author: '',
    category: '',
    maxPrice: '',
    maxStock: '',
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; bookId: number | null }>({
    isOpen: false,
    bookId: null,
  });

  const handleDeleteClick = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteConfirmation({ isOpen: true, bookId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.bookId) {
      deleteBook(deleteConfirmation.bookId);
      setDeleteConfirmation({ isOpen: false, bookId: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, bookId: null });
  };

  const handleRowClick = (id: number) => {
    navigate(`/book/${id}`);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book: Book) => {
      return (
        (filters.author === '' || book.author === filters.author) &&
        (filters.category === '' || book.category === filters.category) &&
        (filters.maxPrice === '' || book.price <= Number(filters.maxPrice)) &&
        (filters.maxStock === '' || book.stock <= Number(filters.maxStock))
      );
    });
  }, [books, filters]);

  const uniqueAuthors = useMemo(() => [...new Set(books.map((book: Book) => book.author))], [books]);
  const uniqueCategories = useMemo(() => [...new Set(books.map((book: Book) => book.category))], [books]);

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(error.message);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-1 col-12 mb-1">
      <h2 className='mt-2'>All Books</h2>
      <div className="table-responsive" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
        <table className="table table-striped table-hover h-100">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>
                Author
                <select
                  className="form-select form-select-sm d-inline-block w-auto ms-2"
                  value={filters.author}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                >
                  <option value="">All</option>
                  {uniqueAuthors.map((author) => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </th>
              <th>
                Category
                <select
                  className="form-select form-select-sm d-inline-block w-auto ms-2"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </th>
              <th>
                Price ≤
                <input
                  type="number"
                  className="form-control form-control-sm d-inline-block ms-2"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  style={{ width: '70px' }}
                />
              </th>
              <th>
                Stock ≤
                <input
                  type="number"
                  className="form-control form-control-sm d-inline-block ms-2"
                  placeholder="Max"
                  value={filters.maxStock}
                  onChange={(e) => handleFilterChange('maxStock', e.target.value)}
                  style={{ width: '70px' }}
                />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book: Book) => (
              <tr key={book.id} className='text-center' onClick={() => handleRowClick(book.id)} style={{ cursor: 'pointer' }}>
                <td>
                  <img src={book.bookCover} alt={book.title} style={{ width: '50px', height: '75px', objectFit: 'cover' }} />
                </td>
                <td className="align-middle">{book.title}</td>
                <td className="align-middle">{book.author}</td>
                <td className="align-middle">{book.category}</td>
                <td className="align-middle">${book.price.toFixed(2)}</td>
                <td className="align-middle">{book.stock}</td>
                <td className="align-middle">
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={(e) => handleDeleteClick(book.id, e)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteConfirmation.isOpen && (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="close" onClick={handleCancelDelete}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this book?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooksTable;

// import React, { useState, useMemo } from 'react';
// import { useDeleteBook, useProducts } from '../../../Hooks/productHooks';
// import Spinner from '../../../Components/spinner/Spinner';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   category: string;
//   price: number;
//   stock: number;
//   bookCover?: string;
// }

// const AllBooksTable: React.FC = () => {
//   const { products: books, error, isLoading } = useProducts();
//   const { mutate: deleteBook } = useDeleteBook();
//   const navigate = useNavigate();

//   const [filters, setFilters] = useState({
//     author: '',
//     category: '',
//     maxPrice: '',
//     maxStock: '',
//   });

//   const handleDeleteBook = (id: number, event: React.MouseEvent) => {
//     event.stopPropagation();
//     console.log(`Deleting book with id: ${id}`);
//     deleteBook(id);
//   };

//   const handleRowClick = (id: number) => {
//     navigate(`/book/${id}`);
//   };

//   const handleFilterChange = (filterName: string, value: string) => {
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [filterName]: value,
//     }));
//   };

//   const filteredBooks = useMemo(() => {
//     return books.filter((book: Book) => {
//       return (
//         (filters.author === '' || book.author === filters.author) &&
//         (filters.category === '' || book.category === filters.category) &&
//         (filters.maxPrice === '' || book.price <= Number(filters.maxPrice)) &&
//         (filters.maxStock === '' || book.stock <= Number(filters.maxStock))
//       );
//     });
//   }, [books, filters]);

//   const uniqueAuthors = useMemo(() => [...new Set(books.map((book: Book) => book.author))], [books]);
//   const uniqueCategories = useMemo(() => [...new Set(books.map((book: Book) => book.category))], [books]);

//   if (isLoading) return <Spinner />;
//   if (error) {
//     toast.error(error.message);
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="mt-1 col-12 mb-1">
//       <h2 className='mt-2'>All Books</h2>
//       <div className="table-responsive" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
//         <table className="table table-striped table-hover h-100">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>
//                 Author
//                 <select
//                   className="form-select form-select-sm d-inline-block w-auto ms-2"
//                   value={filters.author}
//                   onChange={(e) => handleFilterChange('author', e.target.value)}
//                 >
//                   <option value="">All</option>
//                   {uniqueAuthors.map((author) => (
//                     <option key={author} value={author}>{author}</option>
//                   ))}
//                 </select>
//               </th>
//               <th>
//                 Category
//                 <select
//                   className="form-select form-select-sm d-inline-block w-auto ms-2"
//                   value={filters.category}
//                   onChange={(e) => handleFilterChange('category', e.target.value)}
//                 >
//                   <option value="">All</option>
//                   {uniqueCategories.map((category) => (
//                     <option key={category} value={category}>{category}</option>
//                   ))}
//                 </select>
//               </th>
//               <th>
//                 Price ≤
//                 <input
//                   type="number"
//                   className="form-control form-control-sm d-inline-block  ms-2"
//                   placeholder="Max"
//                   value={filters.maxPrice}
//                   onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//                   style={{ width: '70px' }}
//                 />
//               </th>
//               <th>
//                 Stock ≤
//                 <input
//                   type="number"
//                   className="form-control form-control-sm d-inline-block  ms-2"
//                   placeholder="Max"
//                   value={filters.maxStock}
//                   onChange={(e) => handleFilterChange('maxStock', e.target.value)}
//                   style={{ width: '70px' }}
//                 />
//               </th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBooks.map((book: Book) => (
//               <tr key={book.id} className='text-center' onClick={(e) => handleRowClick(book.id)} style={{ cursor: 'pointer' }}>
//                 <td>
//                   <img src={book.bookCover} alt={book.title} style={{ width: '50px', height: '75px', objectFit: 'cover' }} />
//                 </td>
//                 <td className="align-middle">{book.title}</td>
//                 <td className="align-middle">{book.author}</td>
//                 <td className="align-middle">{book.category}</td>
//                 <td className="align-middle">${book.price.toFixed(2)}</td>
//                 <td className="align-middle">{book.stock}</td>
//                 <td className="align-middle">
//                   <button 
//                     className="btn btn-danger btn-sm" 
//                     onClick={(e) => handleDeleteBook(book.id, e)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllBooksTable;

// import React from 'react';
// import { useDeleteBook, useProducts } from '../../../Hooks/productHooks';
// import Spinner from '../../../Components/spinner/Spinner';
// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   category: string;
//   price: number;
//   stock: number;
//   bookCover?: string; 
// }

// const AllBooksTable: React.FC = () => {
//   const { products: books, error, isLoading } = useProducts();
//   const {mutate:deleteBook} = useDeleteBook()

//   const handleDeleteBook = (id: number) => {
//     console.log(`Deleting book with id: ${id}`);
//     deleteBook(id);
//   };

//   if (isLoading) return <Spinner />;
//   if (error) {
//     toast.error(error.message);
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="mt-1 col-12 mb-1">
//       <h2 className='mt-2'>All Books</h2>
//       <div className="table-responsive" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
//         <table className="table table-striped table-hover h-100">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book: Book) => (
//               <tr key={book.id} className='text-center'>
//                 <td>
//                   <img src={book.bookCover} alt={book.title} style={{ width: '50px', height: '75px', objectFit: 'cover' }} />
//                 </td>
//                 <td className="align-middle">{book.title}</td>
//                 <td className="align-middle">{book.author}</td>
//                 <td className="align-middle">{book.category}</td>
//                 <td className="align-middle">${book.price.toFixed(2)}</td>
//                 <td className="align-middle">{book.stock}</td>
//                 <td className="align-middle">
//                   <button 
//                     className="btn btn-danger btn-sm" 
//                     onClick={() => handleDeleteBook(book.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllBooksTable;

