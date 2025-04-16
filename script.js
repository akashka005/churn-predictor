window.addEventListener('load', () => {
    gsap.from(".hero h1", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".hero p", { y: 20, opacity: 0, duration: 1.2, delay: 0.3, ease: "power2.out" });
    gsap.from(".input-card", { x: -100, opacity: 0, duration: 1.3, delay: 0.5, ease: "power2.out" });
    gsap.from(".result-card", { x: 100, opacity: 0, duration: 1.3, delay: 0.8, ease: "power2.out" });
  });
  
  document.getElementById('churnForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const charges = parseFloat(document.getElementById('charges').value);
    const tenure = parseInt(document.getElementById('tenure').value);
    const contract = document.getElementById('contract').value;
  
    let score = 0;
    if (charges > 70) score += 1;
    if (tenure < 12) score += 1;
    if (contract === "Month-to-month") score += 1;
  
    const resultCard = document.getElementById('resultCard');
    const loadingCard = document.getElementById('loadingCard');
    const resultText = document.getElementById('resultText');
  
    resultCard.classList.add('hidden');
    loadingCard.classList.remove('hidden');
  
    gsap.fromTo("#loadingCard",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  
    setTimeout(() => {
      loadingCard.classList.add('hidden');
      resultCard.classList.remove('hidden');
  
      const message = score >= 2 ? "⚠️ High Risk of Churn" : "✅ Likely to Stay";
      const color = score >= 2 ? "#ff7675" : "#00feba";
  
      resultText.innerHTML = "";
      resultText.style.color = color;
  
      gsap.fromTo("#resultCard",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
      let charIndex = 0;
      const type = () => {
        if (charIndex <= message.length) {
          resultText.innerHTML = message.substring(0, charIndex);
          charIndex++;
          setTimeout(type, 60);
        }
      };
      type();
    }, 2000);
  });
