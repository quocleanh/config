// Tạo và thêm CSS vào trong head của document
const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0;
        overflow: hidden;
    }

    .petal {
        position: absolute;
        width: 20px;
        height: 20px;
        background-size: contain;
        background-repeat: no-repeat;
        pointer-events: none;
    }

    .firework {
        position: absolute;
        width: 2px; /* Chiều rộng nhỏ để tạo line mỏng */
        height: 50px; /* Chiều dài của tia */
        background-color: gold; /* Màu sắc của tia pháo hoa */
        pointer-events: none;
        transform-origin: center bottom; /* Gốc xoay từ dưới cùng */
    }

    @keyframes fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }

        100% {
            opacity: 0;
            transform: scale(3);
        }
    }
`;
document.head.appendChild(style);

// Tạo hiệu ứng hoa mai và pháo hoa

const TOTAL_PETALS = 30; // Số lượng hoa mai hiển thị cùng lúc
const PETAL_IMAGES = [
    'https://raw.githubusercontent.com/quocleanh/config/refs/heads/main/assets/mai.png', // Hoa mai 1
    'https://raw.githubusercontent.com/quocleanh/config/refs/heads/main/assets/dao.png', // Hoa mai 2
];

// Hàm chọn ngẫu nhiên 1 loại hoa
function getRandomPetalImage() {
    const index = Math.floor(Math.random() * PETAL_IMAGES.length);
    return PETAL_IMAGES[index];
}

// Hàm tạo hoa mai
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.backgroundImage = `url('${getRandomPetalImage()}')`;

    const startX = Math.random() * window.innerWidth; // Vị trí bắt đầu
    const size = Math.random() * 15 + 15; // Kích thước hoa mai
    const duration = Math.random() * 10 + 8; // Thời gian rơi
    const endY = window.innerHeight + 50; // Điểm kết thúc
    const amplitude = Math.random() * 100 + 50; // Độ rộng ziczac
    const rotation = Math.random() * 360; // Góc xoay ban đầu
    const rotationSpeed = Math.random() * 200 + 100; // Tốc độ xoay

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${startX}px`;
    petal.style.top = `-50px`;

    document.body.appendChild(petal);

    // Tạo hiệu ứng ziczac, rơi xuống và xoay
    const animation = petal.animate([
        { transform: `translate(0, 0) rotate(${rotation}deg)`, offset: 0 },
        { transform: `translate(${amplitude}px, ${endY / 4}px) rotate(${rotation + rotationSpeed / 4}deg)`, offset: 0.25 },
        { transform: `translate(-${amplitude}px, ${endY / 2}px) rotate(${rotation + rotationSpeed / 2}deg)`, offset: 0.5 },
        { transform: `translate(${amplitude}px, ${(3 * endY) / 4}px) rotate(${rotation + (3 * rotationSpeed) / 4}deg)`, offset: 0.75 },
        { transform: `translate(0, ${endY}px) rotate(${rotation + rotationSpeed}deg)`, offset: 1 }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });

    animation.onfinish = () => petal.remove();
}

function createFirework() {
    const x = Math.random() * window.innerWidth; // Vị trí X ngẫu nhiên
    const y = Math.random() * window.innerHeight; // Vị trí Y ngẫu nhiên
    const particleCount = 20; // Số lượng tia pháo hoa

    // Mảng màu sắc ngẫu nhiên
    const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink', 'cyan'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Chọn màu ngẫu nhiên
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;

        const angle = (360 / particleCount) * i; // Góc chia đều cho các tia
        const distance = Math.random() * 100 + 50; // Khoảng cách mỗi tia

        // Xoay tia pháo hoa theo góc
        particle.style.transform = `rotate(${angle}deg)`;

        // Tạo animation cho tia pháo hoa
        particle.animate([
            { transform: `rotate(${angle}deg) translate(0, 0)`, opacity: 1 },
            { transform: `rotate(${angle}deg) translate(0, -${distance}px)`, opacity: 0 }
        ], {
            duration: 1000, // Thời gian hiệu ứng 1s
            easing: 'ease-out'
        }).onfinish = () => particle.remove(); // Xóa khi kết thúc

        document.body.appendChild(particle);
    }
}

// Tạo hiệu ứng hoa mai rơi liên tục
function generatePetals() {
    setInterval(() => {
        createPetal();
    }, 500); // Cứ 500ms tạo 1 bông hoa
}

// Tạo pháo hoa ngẫu nhiên
function generateFireworks() {
    setInterval(() => {
        createFirework();
    }, 3000); // Cứ 3s tạo 1 hiệu ứng pháo hoa
}

// Bắt đầu hiệu ứng
generatePetals();
generateFireworks();
