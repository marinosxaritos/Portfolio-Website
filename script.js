function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("icon");
}

document.addEventListener("DOMContentLoaded", function () {
  const flipper = document.querySelector(".flipper");
  const picContainer = document.querySelector(".section__pic-container");

  if (!flipper || !picContainer) return;

  // Auto-flip function
  function doAutoFlip() {
    flipper.style.transition = "transform 1s ease-in-out";
    flipper.style.transform = "rotateY(180deg)";

    setTimeout(() => {
      flipper.style.transform = "rotateY(0)";
      initHoverAndTouch(); 
    }, 1000);
  }

  // Ενεργοποίηση hover (desktop) και touch (mobile)
  function initHoverAndTouch() {
    // Hover για desktop
    picContainer.addEventListener("mouseenter", () => {
      flipper.style.transform = "rotateY(180deg)";
    });

    picContainer.addEventListener("mouseleave", () => {
      flipper.style.transform = "rotateY(0)";
    });

    // Touch για mobile
    picContainer.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        const isFlipped = flipper.style.transform.includes("180deg");
        flipper.style.transform = isFlipped ? "rotateY(0)" : "rotateY(180deg)";
      }
    });
  }

  // Αρχικό auto-flip (μόνο σε desktop)
  if (!window.matchMedia("(max-width: 767px)").matches) {
    setTimeout(doAutoFlip, 1600);
  } else {
    setTimeout(doAutoFlip, 400);
  }
});

const codeLines = [
  "<tspan class='keyword'>while</tspan>(<tspan class='variable'>alive</tspan>){",
  "<tspan x='20' dy='30' class='variable'>opportunity</tspan> <tspan class='symbol'>=</tspan> <tspan class='function'>new</tspan> <tspan class='function'>Opportunity</tspan>();",
  "<tspan x='20' dy='30' class='variable'>me</tspan>.<tspan class='function'>grab</tspan>(<tspan class='variable'>opportunity</tspan>);",
  "}",
];

const codeElement = document.getElementById("code");
let lineIndex = 0;
let charIndex = 0;
let currentHtml = "";
let currentText = "";
let isTag = false;
let tagContent = "";

function typeCode() {
  if (lineIndex < codeLines.length) {
    const line = codeLines[lineIndex];

    if (charIndex < line.length) {
      const char = line[charIndex];

      if (char === "<") {
        // Start of tag
        isTag = true;
        tagContent = char;
        charIndex++;
        // Process the whole tag at once
        while (charIndex < line.length && line[charIndex] !== ">") {
          tagContent += line[charIndex];
          charIndex++;
        }
        if (charIndex < line.length) {
          tagContent += ">";
          charIndex++;
        }
        currentHtml += tagContent;
        codeElement.innerHTML = currentHtml + '<span class="cursor">|</span>';
        setTimeout(typeCode, 0); // No delay for tags
        return;
      } else if (!isTag) {
        
        currentText += char;
        currentHtml += char;
        codeElement.innerHTML = currentHtml + '<span class="cursor">|</span>';
        charIndex++;
      }

      const delay = isTag ? 0 : 50 + Math.random() * 50; 
      setTimeout(typeCode, delay);
      isTag = false;
    } else {
      
      currentHtml += "\n";
      currentText += "\n";
      codeElement.innerHTML = currentHtml;
      lineIndex++;
      charIndex = 0;
      setTimeout(typeCode, 300); 
    }
  } else {
    
    codeElement.innerHTML = currentHtml;
    setTimeout(resetAnimation, 2000);
  }
}

function resetAnimation() {
  codeElement.innerHTML = "";
  lineIndex = 0;
  charIndex = 0;
  currentHtml = "";
  currentText = "";
  setTimeout(typeCode, 500);
}

typeCode();


/* =========================================
   PROJECTS SLIDER FUNCTIONALITY
   ========================================= */
function slideProjects(direction) {
  const slider = document.querySelector('.projects-slider');
  if (!slider) return;
  
  // Σκρολάρει ακριβώς 1 ολόκληρη σελίδα
  const scrollAmount = slider.clientWidth; 
  
  slider.scrollBy({ 
    left: scrollAmount * direction, 
    behavior: 'smooth' 
  });
}


/* =========================================
   BLOG SLIDER NAVIGATION
   ========================================= */
function slideBlog(direction) {
  const container = document.getElementById('blog-slider');
  // Το 482 είναι το μέγεθος της κάρτας (450) + το κενό gap (32)
  const scrollAmount = 482; 
  
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}


/* =========================================
   MODAL ΓΙΑ ΤΟ BLOG (CRAFT DOCS)
   ========================================= */
function openModal(modalId) {
  // Ανοίγει το επιλεγμένο παράθυρο
  document.getElementById(modalId).style.display = "flex";
  // Κλειδώνει το background ώστε να μην μπορείς να κάνεις scroll τη σελίδα από πίσω
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  // Κλείνει το παράθυρο
  document.getElementById(modalId).style.display = "none";
  // Ξεκλειδώνει το background
  document.body.style.overflow = "auto";
}

// Αν ο χρήστης κάνει κλικ στο σκοτεινό φόντο έξω από το iframe, το παράθυρο κλείνει
window.onclick = function(event) {
  if (event.target.classList.contains('craft-modal')) {
    event.target.style.display = "none";
    document.body.style.overflow = "auto";
  }
}


/* =========================================
   AUTO-SCROLL & HIGHLIGHT ΓΙΑ ΤΑ ΑΡΘΡΑ (ΑΠΟ LINK)
   ========================================= */
window.onload = function() {
  var currentHash = window.location.hash;
  let targetCard = null;

  // Ελέγχουμε ποιο άρθρο ζήτησε ο χρήστης από το URL
  if (currentHash === '#grab') {
    targetCard = document.getElementById('blog-grab');
  } else if (currentHash === '#figma') {
    targetCard = document.getElementById('blog-figma');
  } else if (currentHash === '#methodology') {
    targetCard = document.getElementById('blog-methodology');
  } 

  // Αν βρεθεί η κάρτα, κάνουμε scroll και highlight (ΧΩΡΙΣ να ανοίξουμε το modal)
  if (targetCard) {
    // 1. Κάνουμε smooth scroll ώστε η κάρτα να έρθει ακριβώς στο κέντρο της οθόνης
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 2. Προσθέτουμε το εφέ highlight για να τραβήξει την προσοχή
    targetCard.style.transition = "all 0.5s ease";
    targetCard.style.borderColor = "#222"; 
    targetCard.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";
    targetCard.style.transform = "scale(1.03)";

    // 3. Μετά από 2.5 δευτερόλεπτα, επαναφέρουμε την κάρτα στην αρχική της κατάσταση
    setTimeout(() => {
      targetCard.style.borderColor = "rgb(163, 163, 163)";
      targetCard.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      targetCard.style.transform = "scale(1)";
    }, 2500);
  }
};