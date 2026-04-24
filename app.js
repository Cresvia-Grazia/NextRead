const API_URL = "https://script.google.com/macros/s/AKfycbx_t2sre1s5rtwNhUx2RWu8cG-mIpBXGGUpK8t1wr18MFtTa4DH75L-lX-trPOy32TbqA/exec";

async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

function renderBooks(books) {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = ''; // Clear skeleton loaders

    books.forEach(book => {
        // Calculate Promo Price
        const displayPrice = book.PROMO_FLAG === "TRUE" ? book.PRICE : book.SRP;
        const showBadge = book.PROMO_FLAG === "TRUE" ? '' : 'hidden';

        grid.innerHTML += `
            <div class="group cursor-pointer">
                <div class="relative aspect-[2/3] bg-gray-100 rounded shadow-sm overflow-hidden mb-3">
                    <img src="${book.COVER_IMAGE_Front_URL}" 
                         loading="lazy" 
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <span class="${showBadge} absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase">Sale</span>
                </div>
                <h3 class="text-sm font-bold line-clamp-2 uppercase tracking-tight h-10">${book.TITLE}</h3>
                <p class="text-xs text-gray-500 mb-2 italic">${book.AUTHOR}</p>
                <div class="flex items-center gap-2">
                    <span class="text-blue-700 font-bold">₱${displayPrice}</span>
                    ${book.PROMO_FLAG === "TRUE" ? `<span class="text-xs text-gray-400 line-through">₱${book.SRP}</span>` : ''}
                </div>
                <button onclick="openReservation('${book.BOOK_ID}')" 
                        class="w-full mt-4 border border-blue-600 text-blue-600 py-2 text-xs font-black hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest">
                    Reserve Now
                </button>
            </div>
        `;
    });
}

// Initial load
fetchBooks();
