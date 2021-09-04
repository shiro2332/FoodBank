function addMessage() {
    db.collection("ContactMessage").add({
        name: document.getElementById("messageName").value,
        email: document.getElementById("messageEmail").value,
        message: document.getElementById("messageContent").value,
    })
    .then(() => {
        alert("Message send successfully!\nPlease wait 1 business days for your reply!")

    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

 /*
                               佛祖大仙
                               _ooOoo_
                              o8888888o
                              88" . "88
                              (| -_- |)
                              O\  =  /O
                           ____/`---'\____
                         .'  \\|     |//  `.
                        /  \\|||  :  |||//  \
                       /  _||||| -:- |||||_  \
                       |   | \\\  -  /'| |   |
                       | \_|  `\`---'//  |_/ |
                       \  .-\__ `-. -'__/-.  /
                     ___`. .'  /--.--\  `. .'___
                  ."" '<  `.___\_<|>_/___.' _> \"".
                 | | :  `- \`. ;`. _/; .'/ /  .' ; |
                 \  \ `-.   \_\_`. _.'_/_/  -' _.' /
       ===========`-.`___`-.__\ \___  /__.-'_.'_.-'================
                               `=--=-'                    
                            有神明加持的程序
*/