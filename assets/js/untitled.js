document.querySelector(".modal-footer button.btn-info").addEventListener("click", function() {
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
    })
    .then(response => response.json())
    .then(responseData => {
        if(responseData.result === "success") {
            alert("تم إرسال البيانات بنجاح!");
            document.getElementById('quoteForm').reset();
        } else {
            alert("حدث خطأ أثناء الإرسال!");
        }
    })
    .catch(error => {
        console.error('Error!', error.message);
    });
});