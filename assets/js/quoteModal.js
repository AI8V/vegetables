// هذا الكود يتم تنفيذه عند فتح نافذة طلب عرض السعر
document.getElementById('quoteModal').addEventListener('show.bs.modal', function (event) {
  // الزر الذي تم الضغط عليه لفتح النافذة
  const button = event.relatedTarget;
  
  // البحث عن أقرب بطاقة منتج (card) للزر
  const productCard = button.closest('.card');
  
  // استخراج عنوان المنتج من البطاقة
  const productTitle = productCard.querySelector('.card-title').textContent;
  
  // الحصول على عنصر القائمة المنسدلة
  const selectElement = document.getElementById('productName');
  
  // إضافة خيارات المنتجات المعروضة حالياً إذا كانت القائمة فارغة
  if (selectElement.options.length <= 1) {
    // الحصول على جميع عناوين المنتجات المعروضة حالياً في الصفحة
    const allProducts = document.querySelectorAll('.tab-pane.active .card-title');
    
    // تفريغ القائمة المنسدلة
    selectElement.innerHTML = '';
    
    // إضافة الخيارات للقائمة المنسدلة
    allProducts.forEach(product => {
      const option = document.createElement('option');
      option.value = product.textContent;
      option.textContent = product.textContent;
      selectElement.appendChild(option);
    });
  }
  
  // تحديد المنتج الذي تم اختياره
  for (let i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].value === productTitle) {
      selectElement.selectedIndex = i;
      break;
    }
  }
});