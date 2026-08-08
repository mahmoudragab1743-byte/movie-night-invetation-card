const PERSUASION = [
    "NO 🫣" , "Are you sure!?" , "Last chance! ⏱️"
]

let persuasionIndex = 0;
const noBtn = document.getElementById("noBtn");
const maincard = document.getElementById("maincard");
const stepQuestion = document.getElementById("step-question");
const stepschedule = document.getElementById("step-schedule");
const successOverlay = document.getElementById("successOverlay");
const timerEl = document.getElementById("timer");

let totalseconds = 5*60;
const timerInterval = setInterval(() => {
    if (totalseconds<=0) {
        clearInterval(timerInterval);
        timerEl.textContent = "EXPIRED";
        timerEl.style.color = "#ff5252";
        return;
    }
    totalseconds--;
    const mins =String(Math.floor(totalseconds / 60)).padStart(2, "0");
    const secs = String(totalseconds % 60).padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;
}, 1000);

function moveNobutton() {
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    const btnrect = noBtn.getBoundingClientRect();
    const btnW = btnrect.width;
    const btnH = btnrect.height;

    const padding = 20;
    const maxSafex = winW - btnW - padding;
    const maxSafey = winH - btnH - padding;

    const safeMaxX = Math.max(maxSafex, padding);   
    const safeMaxY = Math.max(maxSafey, padding);

    const randomX = padding + (Math.random() * (safeMaxX - padding));
    const randomY = padding + (Math.random() * (safeMaxY - padding));
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.zIndex = '1000';
    noBtn.style.transition = 'all 0.2s ease-out';

    persuasionIndex = (persuasionIndex + 1) % PERSUASION.length;
    noBtn.textContent = PERSUASION[persuasionIndex];
}


    noBtn.addEventListener('mouseover', moveNobutton);
    noBtn.addEventListener('touchstart', (e) => {e.preventDefault(); moveNobutton(); });
    noBtn.addEventListener('click', (e) => {e.preventDefault(); moveNobutton(); });



 function goToScheduling() {
        stepQuestion.style.display = "none";
        stepschedule.style.display = "block";

        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        document.getElementById('dateInput').min = now.toISOString().slice(0,16);
    }
 function finalizeDate() {
            const place = document.getElementById('placeInput').value;
            const dateVal = document.getElementById('dateInput').value;

            if(!place || !dateVal) {
                alert("Please fill in both the place and time.");
                return;
            }
            const dateObj = new Date(dateVal);
            const options = { weekday: 'long' , month: 'long' , day: 'numeric' , hour: 'numeric' , minute: 'numeric' };
            const formattedDate = dateObj.toLocaleString('en-US', options);

            document.getElementById('finalMovieNightplace').textContent = place;
document.getElementById('finalMovieNight').textContent = formattedDate;

           successOverlay.classList.add('active');
           lanchConfetti();
        }  
function lanchConfetti() {
            const color = ['#e91e63', '#ff4081', '#ffd54f', '#ffffff', '#7c4dff'];
            for (let i =0; i<80; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece'; 
                piece.style.left = Math.random() * 100 + 'vw';
                piece.style.top = '-10px';
                piece.style.backgroundColor = color[Math.floor(Math.random() * color.length)];
                piece.style.width = (Math.random() * 8 + 6) + 'px';
                piece.style.height = (Math.random() * 8 + 6) + 'px';
                piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
                piece.style.animationDelay = Math.random() * 1.5 + 's';
                document.body.appendChild(piece);
                setTimeout(() => 
                    piece.remove(), 5000);
                
            }
        }
  function createParticles() {
            const container = document.getElementById('particles');
            const emojis = ['🎬', '🍿', '🎥', '📽️', '🎞️']  ;
            for(let i=0; i<20; i++) {
                const p = document.createElement('div');
                p.className ='particles';
                p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
                p.style.left =Math.random() * 100 + "%";
                p.style.fontSize = (Math.random() * 20 +14 ) + 'px' ;
                p.style.animationDuration = (Math.random() * 8 + 6) + 's';
                p.style.animationDelay = (Math.random() * 10 ) + 's';
                container.appendChild(p);
        }
    }


    createParticles();