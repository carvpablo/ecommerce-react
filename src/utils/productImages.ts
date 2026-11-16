const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "Teclado Mecânico RGB": "/images/products/teclado-mecanico-rgb.jpg",
  "Mouse Gamer 16000 DPI": "/images/products/mouse-gamer.jpg",
  "Headset 7.1 Surround": "/images/products/headset-7-1.jpg",
  'Monitor Gamer 144Hz 24"': "/images/products/monitor-gamer-144hz.jpg",
  "Mousepad Extra Grande (90x40cm)": "/images/products/mousepad-extra-grande.jpg",
  "Cadeira Ergonômica Mesh": "/images/products/cadeira-ergonomica-mesh.jpg",
  "Webcam Full HD 1080p": "/images/products/webcam-full-hd.jpg",
  "Suporte Articulado para Monitor": "/images/products/suporte-articulado-monitor.jpg",
};

/**
 * Retorna o caminho da imagem estática correspondente ao nome do produto, se existir.
 */
export function getProductImage(productName: string): string | undefined {
  if (PRODUCT_IMAGE_MAP[productName]) {
    return PRODUCT_IMAGE_MAP[productName];
  }

  const normalized = productName.toLowerCase();
  const matchedEntry = Object.entries(PRODUCT_IMAGE_MAP).find(([key]) =>
    normalized.includes(key.toLowerCase()),
  );

  return matchedEntry?.[1];
}
