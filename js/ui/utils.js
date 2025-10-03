export function log(msg) {   //each call a div is created and append to the log area with msg as textcontent
            const logArea = document.getElementById('logArea');
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.textContent = `> ${msg}`;
            logArea.appendChild(entry);
            logArea.scrollTop = logArea.scrollHeight; //Automatically scroll to the bottom every time a new log entry is added
        }

       export function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }