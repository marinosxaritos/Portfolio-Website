function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("icon");
}

document.addEventListener('DOMContentLoaded', function() {
    const flipper = document.querySelector('.flipper');
    const picContainer = document.querySelector('.section__pic-container');
    
    function doAutoFlip() {
      flipper.style.transition = 'transform 0.8s ease-in-out';
      flipper.style.transform = 'rotateY(180deg)';
      
      setTimeout(() => {
        flipper.style.transform = 'rotateY(0)';
        
        // Μετά το auto-flip, ενεργοποιούμε το hover effect
        setTimeout(() => {
          flipper.style.transition = 'transform 0.6s ease';
          picContainer.addEventListener('mouseenter', doHoverFlip);
          picContainer.addEventListener('mouseleave', resetFlip);
        }, 1000);
      }, 1000);
    }
    
    function doHoverFlip() {
      flipper.style.transform = 'rotateY(180deg)';
    }
    
    function resetFlip() {
      flipper.style.transform = 'rotateY(0)';
    }
    
    // Αρχικό auto-flip με καθυστέρηση 1.6s
    setTimeout(doAutoFlip, 1600);
  });

const codeLines = [
    "<tspan class='keyword'>while</tspan>(<tspan class='variable'>alive</tspan>){", 
    "<tspan x='20' dy='30' class='variable'>opportunity</tspan> <tspan class='symbol'>=</tspan> <tspan class='function'>new</tspan> <tspan class='function'>Opportunity</tspan>();", 
    "<tspan x='20' dy='30' class='variable'>me</tspan>.<tspan class='function'>grab</tspan>(<tspan class='variable'>opportunity</tspan>);", 
    "}" 
];

const codeElement = document.getElementById("code");
let lineIndex = 0;
let charIndex = 0;
let currentHtml = '';
let currentText = '';
let isTag = false;
let tagContent = '';

function typeCode() {
    if (lineIndex < codeLines.length) {
        const line = codeLines[lineIndex];
        
        if (charIndex < line.length) {
            const char = line[charIndex];
            
            if (char === '<') {
                // Start of tag
                isTag = true;
                tagContent = char;
                charIndex++;
                // Process the whole tag at once
                while (charIndex < line.length && line[charIndex] !== '>') {
                    tagContent += line[charIndex];
                    charIndex++;
                }
                if (charIndex < line.length) {
                    tagContent += '>';
                    charIndex++;
                }
                currentHtml += tagContent;
                codeElement.innerHTML = currentHtml + '<span class="cursor">|</span>';
                setTimeout(typeCode, 0); // No delay for tags
                return;
            } else if (!isTag) {
                // Regular character
                currentText += char;
                currentHtml += char;
                codeElement.innerHTML = currentHtml + '<span class="cursor">|</span>';
                charIndex++;
            }
            
            const delay = isTag ? 0 : 50 + Math.random() * 50; // Natural typing variation
            setTimeout(typeCode, delay);
            isTag = false;
        } else {
            // Move to next line
            currentHtml += '\n';
            currentText += '\n';
            codeElement.innerHTML = currentHtml;
            lineIndex++;
            charIndex = 0;
            setTimeout(typeCode, 300); // Shorter delay between lines
        }
    } else {
        // Remove cursor at end
        codeElement.innerHTML = currentHtml;
        setTimeout(resetAnimation, 2000);
    }
}

function resetAnimation() {
    codeElement.innerHTML = '';
    lineIndex = 0;
    charIndex = 0;
    currentHtml = '';
    currentText = '';
    setTimeout(typeCode, 500);
}

typeCode();




















