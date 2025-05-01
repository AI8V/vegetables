/**
 * ملف JavaScript المجمع
 * يتضمن تهيئة Google Analytics وكل النصوص البرمجية للموقع
 */

// Google Analytics Initialization
(function() {
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-88S27K9NKH';
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'G-88S27K9NKH');
})();

// وضع جميع النصوص البرمجية داخل استدعاء DOMContentLoaded للتأكد من تحميل الصفحة أولاً
document.addEventListener('DOMContentLoaded', function() {
  
  // تتبع نقرات الأزرار تلقائيًا (من Google Analytics)
  document.querySelectorAll('button, a, input[type="submit"]').forEach(function(element) {
    element.addEventListener('click', function() {
      var label = element.innerText || element.value || element.getAttribute('aria-label') || 'Unknown Element';
      gtag('event', 'element_click', {
        'event_category': 'interaction',
        'event_label': label.trim(),
        'value': 1
      });
    });
  });

  // تتبع تنزيلات الملفات (من Google Analytics)
  document.querySelectorAll('a[href$=".pdf"], a[href$=".docx"], a[href$=".xlsx"], a[href$=".zip"]').forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'file_download', {
        'event_category': 'downloads',
        'event_label': link.getAttribute('href'),
        'value': 1
      });
    });
  });

  // تتبع إرسال النماذج (من Google Analytics)
  document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function() {
      gtag('event', 'form_submit', {
        'event_category': 'forms',
        'event_label': form.getAttribute('id') || form.getAttribute('name') || 'Unknown Form',
        'value': 1
      });
    });
  });

  // ScriptGoogle.js - إرسال بيانات النموذج
  const quoteButton = document.querySelector(".modal-footer button.btn-info");
  if (quoteButton) {
    quoteButton.addEventListener("click", function() {
      const form = document.getElementById("quoteForm");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      const data = {
        productName: document.getElementById("productName").value,
        quantity: document.getElementById("quantity").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        notes: document.getElementById("notes").value
      };
      
      // إرسال بيانات الاقتباس إلى Google Script
      fetch("https://script.google.com/macros/s/AKfycbzKdCIce5CpZLv2N5DUiyhrpE3X8EAVhcSzBakTuDOP5yC8lKTSSLuLI8RdGOYyP_H-/exec", {
        method: "POST",
        body: JSON.stringify(data)
      });
      
      // إضافة تتبع Google Analytics لإرسال طلب الاقتباس
      gtag('event', 'quote_request', {
        'event_category': 'leads',
        'event_label': data.productName,
        'value': 1
      });
    });
  }

  // WhyUs.js - تأثيرات العداد والرسوم المتحركة
  const counterElements = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.innerText);
        let count = 0;
        const interval = setInterval(() => {
          target.innerText = count;
          if (count >= countTo) {
            clearInterval(interval);
          }
          count = Math.ceil(count + countTo / 20);
        }, 50);
        observer.unobserve(target);
        
        // إضافة تتبع Google Analytics لمشاهدة العدادات
        gtag('event', 'view_counter', {
          'event_category': 'engagement',
          'event_label': target.getAttribute('id') || 'counter',
          'value': countTo
        });
      }
    });
  }, { threshold: 0.5 });
  
  counterElements.forEach(el => {
    observer.observe(el);
  });

  const cards = document.querySelectorAll(".hover-effect");
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
        cardObserver.unobserve(entry.target);
        
        // إضافة تتبع Google Analytics لمشاهدة البطاقات
        gtag('event', 'view_card', {
          'event_category': 'visibility',
          'event_label': entry.target.querySelector('.card-title')?.textContent || 'product_card',
          'value': 1
        });
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";
    cardObserver.observe(card);
  });

  // quoteModal.js - التعامل مع نافذة الاقتباس المنبثقة
  const quoteModal = document.getElementById("quoteModal");
  if (quoteModal) {
    quoteModal.addEventListener("show.bs.modal", function(event) {
      const button = event.relatedTarget;
      const productCard = button.closest(".card");
      let productTitle = "";
      
      if (productCard && productCard.querySelector(".card-title")) {
        productTitle = productCard.querySelector(".card-title").textContent;
      }
      
      const selectElement = document.getElementById("productName");
      const allProducts = document.querySelectorAll(".card-title");
      selectElement.innerHTML = "";
      
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "-- اختر المنتج --";
      selectElement.appendChild(defaultOption);
      
      allProducts.forEach(product => {
        if (product.textContent.trim() !== "") {
          const option = document.createElement("option");
          option.value = product.textContent;
          option.textContent = product.textContent;
          selectElement.appendChild(option);
        }
      });
      
      if (productTitle) {
        for (let i = 0; i < selectElement.options.length; i++) {
          if (selectElement.options[i].value === productTitle) {
            selectElement.selectedIndex = i;
            break;
          }
        }
      }
      
      // إضافة تتبع Google Analytics لفتح نافذة الاقتباس
      gtag('event', 'open_quote_modal', {
        'event_category': 'engagement',
        'event_label': productTitle || 'unknown_product',
        'value': 1
      });
    });
  }
});
