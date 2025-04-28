document.querySelector(".modal-footer button.btn-info").addEventListener("click", function() {
    const form = document.getElementById('quoteForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const data = {
        productName: document.getElementById('productName').value,
        quantity: document.getElementById('quantity').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        notes: document.getElementById('notes').value
    };

    fetch('https://script.google.com/macros/s/AKfycbzKdCIce5CpZLv2N5DUiyhrpE3X8EAVhcSzBakTuDOP5yC8lKTSSLuLI8RdGOYyP_H-/exec', {
        method: 'POST',
        body: JSON.stringify(data),
    });
});