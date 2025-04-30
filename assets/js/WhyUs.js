document.addEventListener('DOMContentLoaded', function() {
  const counterElements = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
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
          count = Math.ceil(count + countTo/20);
        }, 50);
        
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  counterElements.forEach(el => {
    observer.observe(el);
  });
  
  // تفعيل تأثيرات إضافية عند التمرير
  const cards = document.querySelectorAll('.hover-effect');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";
    cardObserver.observe(card);
  });
});