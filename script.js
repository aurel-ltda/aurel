// Configuración de Datos
const products = [
    {
        id: 1,
        name: "The Essential Tee",
        tagline: "Modern Fit — 220 GSM",
        price: "$28.900",
        description: "Nuestra polera insignia. Estructura pesada que define la silueta sin sacrificar la frescura del algodón noble.",
        variants: {
            'Gris Vigoré': { hex: '#9b9b9b', image: './img/gris.png' },
            'Marino': { hex: '#000080', image: './img/azul.jpg' },
            'Negro': { hex: '#000000', image: './img/negro.jpg' }
        }
    },
    {
        id: 2,
        name: "The Boxy Heavy",
        tagline: "Relaxed Fit — 260 GSM",
        price: "$32.900",
        description: "Corte cuadrado inspirado en el streetwear de alta gama. Máximo gramaje para una caída arquitectónica.",
        variants: {
            'Gris Vigoré': { hex: '#9b9b9b', image: './img/poleron-gris.jpg' },
            'Marino': { hex: '#000080', image: './img/poleron.png' },
            'Negro': { hex: '#000000', image: './img/poleron-negro.jpg' }
        }
    },
    {
        id: 3,
        name: "The Long Sleeve",
        tagline: "Modern Fit — 160 GSM",
        price: "$36.900",
        description: "Manga larga con puños acanalados. La pieza de transición perfecta para el clima chileno.",
        variants: {
            'Blanco': { hex: '#ffffff', image: './img/hombre-larga.jpg' }
        }
    },
    {
        id: 4,
        name: "The Signature Hoodie",
        tagline: "Premium Terry — 400 GSM",
        price: "$54.900",
        description: "Algodón terry francés sin cepillar. Pesado, duradero y minimalista. Sin logos, solo calidad.",
        variants: {
            'Blanco': { hex: '#ffffff', image: './img/chica.jpg' },
            'Negro': { hex: '#000000', image: './img/chica2.jpg'} 
        }
    },

    {
        id: 5,
        name: "The Signature Hoodie",
        tagline: "Premium Terry — 400 GSM",
        price: "$54.900",
        description: "Algodón terry francés sin cepillar. Pesado, duradero y minimalista. Sin logos, solo calidad.",
        variants: {
            'Blanco': { hex: '#ffffff', image: './img/chica4.jpg' },
            'Negro': { hex: '#000000', image: './img/chica3.jpg' }
        }
    },

];

const catalogContainer = document.getElementById('catalog');

// Renderizar Productos
function renderProducts() {
    products.forEach(product => {
        const firstColor = Object.keys(product.variants)[0];
        const section = document.createElement('section');
        section.className = 'px-6 max-w-md mx-auto reveal';
        section.id = `product-${product.id}`;
        
        section.innerHTML = `
            <div class="space-y-6">
                <div class="relative aspect-[4/5] bg-white overflow-hidden rounded-sm shadow-sm">
                    <img id="img-${product.id}" src="${product.variants[firstColor].image}" alt="${product.name}" class="w-full h-full object-cover animate-fade-in">
                    <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] tracking-widest uppercase font-bold">
                        ${product.tagline.split(' — ')[1]}
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-2xl font-extralight tracking-tight">${product.name}</h3>
                            <p class="text-[9px] tracking-[0.3em] uppercase opacity-40 mt-1">${product.tagline.split(' — ')[0]}</p>
                        </div>
                        <p class="text-lg font-light text-[#3D4238]">${product.price}</p>
                    </div>

                    <p class="text-xs leading-relaxed opacity-60 font-light">${product.description}</p>

                    <div class="flex items-center justify-between py-4 border-t border-black/5">
                        <span class="text-[9px] tracking-[0.2em] uppercase font-bold opacity-30" id="label-${product.id}">Tono: ${firstColor}</span>
                        <div class="flex space-x-3">
                            ${Object.keys(product.variants).map(color => `
                                <button onclick="changeColor(${product.id}, '${color}')" 
                                        class="color-btn-${product.id} w-7 h-7 rounded-full border border-transparent transition-all flex items-center justify-center ${color === firstColor ? 'active border-black scale-110' : ''}"
                                        data-color="${color}">
                                    <div class="w-5 h-5 rounded-full shadow-inner" style="background-color: ${product.variants[color].hex}"></div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        catalogContainer.appendChild(section);
    });
}

// Lógica de cambio de color
window.changeColor = function(productId, colorName) {
    const product = products.find(p => p.id === productId);
    const variant = product.variants[colorName];
    
    // Actualizar Imagen
    const img = document.getElementById(`img-${productId}`);
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = variant.image;
        img.style.opacity = '1';
    }, 300);

    // Actualizar Label
    document.getElementById(`label-${productId}`).innerText = `Tono: ${colorName}`;

    // Actualizar Botones
    const buttons = document.querySelectorAll(`.color-btn-${productId}`);
    buttons.forEach(btn => {
        btn.classList.remove('active', 'border-black', 'scale-110');
        if (btn.getAttribute('data-color') === colorName) {
            btn.classList.add('active', 'border-black', 'scale-110');
        }
    });
};

// Efecto Navbar Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) {
        nav.classList.add('bg-[#F0F1ED]/95', 'backdrop-blur-md', 'border-b', 'border-black/5', 'shadow-sm');
        nav.classList.remove('bg-transparent');
    } else {
        nav.classList.remove('bg-[#F0F1ED]/95', 'backdrop-blur-md', 'border-b', 'border-black/5', 'shadow-sm');
        nav.classList.add('bg-transparent');
    }
    
    // Lógica de revelación al scroll
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
});

// Inicializar
renderProducts();