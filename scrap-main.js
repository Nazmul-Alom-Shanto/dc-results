
async function readResult(rool = 437, group = 1, examList = 271){
    const pdfjsLib = window['pdfjsLib'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    try {
        const fullRool = (1202425000000 + group * 10000 + rool);
        const formData = new URLSearchParams();
        formData.append('rootData', fullRool.toString());
        formData.append('examList', examList.toString());
        formData.append('flagreq', 'checkStudentTranscript');
        const base = 'https://dhakacollege.eshiksabd.com/';
        const url = new URL('controller_student_module.php', base);
        const response = await fetch(url, {
            method : 'POST', 
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : formData.toString()
        });

        const text = await response.text();
        if(text.trim().startsWith('Print-Transcript')) {
            const link = new URL(text, base);
            console.log('function is working, Link is : ' + link);
            // window.open(link, '_blank');
            const response = await fetch(link);
            const pdfData = await response.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        
            const page = await pdf.getPage(1);
            const content = await page.getTextContent();
            const texts =  content.items.map(item => item.str).join(' ');
            // console.log('Extracted Text : \n' + texts);
            return content.items;
        }
        throw new Error('Server didn\'t send the link');
    } catch(err){
        console.warn('something wen wrong while reading result for rool '+ rool);
        console.error(err.message);
        return null;
    }
    
}

const result = {};
const failedRools = [];
const subjects = ['statistics']

async function extractDataFromPDF(i){
    const items = await readResult(i);
    if(!items){ 
        failedRools.push(i);
        console.log('Failed 😢 ' + i);
        return;
    }
    if(!result[i]) result[i] = {};

    items.forEach(item => {
        const x = item.transform[4];
        const y = item.transform[5];
        if(x > 29 && x < 33){
            const str = item.str.toLowerCase();
            if(str !== 'statistics') return;
            const totalMarkItem = items.find(item => {
                const itemX = item.transform[4]; 
                const itemY = item.transform[5];
                if(Math.abs(itemY - y) < 1.5 && itemX > 332 && itemX < 334) return true;
                return false; 
            });
             const gradeItem = items.find(item => {
                const itemX = item.transform[4]; 
                const itemY = item.transform[5];
                if(Math.abs(itemY - y) < 1.5 && itemX > 413 && itemX < 421) return true;
                return false; 
            });
        
            const totalMark = totalMarkItem?.str || 'NF';
            const grade = gradeItem?.str || 'NF'; 
        
            if(!result[i][str]) result[i][str] = {};
            result[i][str].totalMark = totalMark;
            result[i][str].grade = grade;
        
        }
    });
        console.log('Done ✅ ' + i);
        }

        function formateTime(s){
            
            return `${Math.floor(s/60)}m ${Math.round(s % 60)}s` 
        }

async function loadResult(arr){
    const now = new Date();
    let lastFinished = now;
    for(let i = 0; i < arr.length; i++){
        await extractDataFromPDF(arr[i]);
        console.log(`this pdf takes ${Math.round((new Date() - lastFinished)/1000)}s --- Overall Time Passed ${formateTime((new Date() - now)/ 1000)}`);
        lastFinished = new Date();
    }
}



console.log('Done ✅');
console.log('Failed Rools:', JSON.stringify(failedRools));
window.navigator.clipboard.writeText(JSON.stringify(failedRools));
window.navigator.clipboard.writeText(JSON.stringify(result, null, 2));
