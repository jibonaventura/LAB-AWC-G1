export function estrellas(rating) {
    if (!rating) {
        return '';
    }

    let llenas = Math.floor(rating.rate);
    let media = (rating.rate - llenas) >= 0.5;
    let vacias = 5 - llenas - (media ? 1 : 0);
    let iconos = '';

    for (let i = 0; i < llenas; i++) {
        iconos += '<i class="bi bi-star-fill" aria-hidden="true"></i>';
    }

    if (media) {
        iconos += '<i class="bi bi-star-half" aria-hidden="true"></i>';
    }

    for (let i = 0; i < vacias; i++) {
        iconos += '<i class="bi bi-star" aria-hidden="true"></i>';
    }

    return `
        <div class="d-flex align-items-center gap-2 mb-2">
            <span class="text-warning estrellas" role="img" aria-label="Calificacion ${rating.rate} de 5">${iconos}</span>
            <small class="text-muted">${rating.rate} (${rating.count})</small>
        </div>
    `;
}
