const db = firebase.firestore(app);

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

function addApplication() {
    console.log(document.getElementById("name").value);
    db.collection("Users").doc(document.getElementById("uid").value).collection("HelpApplication").add({
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        race: document.getElementById("race").value,
        religion: document.getElementById("religion").value,
        salary: document.getElementById("salary").value,
        familyMember: document.getElementById("familyMember").value,
        homeAddress: document.getElementById("homeAddress").value,
        allergy: document.getElementById("allergy").value,
    })
    .then(() => {
        alert("Application send successfully!\nYou will be noted if you are qualified for help.")
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

//Need to add more later
function addProfile() {
    db.collection("Users").doc(document.getElementById("uid").value).set({
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        race: document.getElementById("race").value,
        religion: document.getElementById("religion").value,
        salary: document.getElementById("salary").value,
        familyMember: document.getElementById("familyMember").value,
        homeAddress: document.getElementById("homeAddress").value,
        allergy: document.getElementById("allergy").value,
    })
    .then(() => {
        alert("Profile updated")
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

async function deleteFoodBank(id){
    await db.collection("FoodBank").doc(id).delete();
}

async function getFoodBanks() {
    const snapshot = await db.collection("FoodBank").get();
    return snapshot.docs;
}

function addFoodBank() {
    let record = db.collection("FoodBank").add({
        dist_time : [document.getElementById("open").value,document.getElementById("close").value],
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        district: document.getElementById("district").value,
        state: document.getElementById("state").value, 
        category: document.getElementById("category").value,
        desc: document.getElementById("desc").value,
        availability: "True",   
    })
    .then(() => {
        alert("Food bank added successfully!")
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

function editFoodBank(id) {
    db.collection("FoodBank").doc(id).set({
        dist_time : [document.getElementById("open").value,document.getElementById("close").value],
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        district: document.getElementById("district").value,
        state: document.getElementById("state").value, 
        category: document.getElementById("category").value,
        desc: document.getElementById("desc").value,
        availability: "True",   
    })
    .then(() => {
        alert("Food bank edited successfully!")
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

async function getUsers() {
    const snapshot = await db.collection("Users").get();
    return snapshot.docs;
}

async function getAdmin() {
    const snapshot = await db.collection("Admin").get();
    return snapshot.docs;
}

function getStates(docs) {
    var list = [];
    docs.forEach(e => {
        if (!list.includes(e.data().state)){
            list.push(e.data().state);
        }
    });
    return list;
}

function getDistricts(docs, state) {
    var list = [];
    docs.forEach(e => {
        if (!list.includes(e.data().district)) {
            if (e.data().state == state) {
                list.push(e.data().district);
            }
        }
    });
    return list;
}

async function searchFoodBanks(state, district) {
    var snapshot;
    if ((district == 'null' || district == '') && (state == 'null' || state == '')) {
        snapshot = await db.collection("FoodBank").get();
        return snapshot.docs;
    } else if (district == '' || district == 'null') {console.log(2);
        snapshot = await db.collection("FoodBank").where('state', '==', state).get();
        return snapshot.docs;
    } else if (state == '' || state == 'null') {
        snapshot = await db.collection("FoodBank").where('district', '==', district).get();
        return snapshot.docs;
    } else {
        snapshot = await db.collection("FoodBank")
        .where('district', '==', district)
        .where('state', '==', state)
        .get();
        return snapshot.docs;
    }
}

/*
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNNNNNNNXXNWMMMMMMMMMMMMMMMMMMMMMMMWWNNNNNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWOllooooooooodlxNMWMMWWXK00KWWWNXK0kxdlc:;;:lox0NWMMMWWNKKKK0KKKKXNWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMK;:O00000000Kk:dNWWMXOkkkkdloolc:,'''''',;,,;;,;lxxxdooc,',,''''',,;:cloxOKNWMMMMMMMMWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWW0,cK000K0K0Kx;dNWWKkdoddl;',,''...',;;;,,,''',,;,,,,,,,;;;;;;;;;;,,,'''...';:ldOKNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWM0,:0K0KK0KKx;oNW0dc:c:,'','....,,;;;,''.'''',;;,,;;;,,,;,,;;;,,;;;;;;;,'',,;,'.',:cok0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMK;;OKKKK0KO:cK0o;,:;,,''....,;;;,,'...',,;;;;;;;;;;;;,,;;;;;;;;,;;;;;,,.....''',;;'.',:ldOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMX:;OK0KKK0c;oo;,;;,,,'...';;,,,'...',;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,'....'',,;;,,;:lx0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXc;OK00KKo..,',;;,....',;,,,'...',;;,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,'....',,;;,'':d0NWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKockkdodd,.;;,;,'. .',;;,'...',;;,,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,,,,,;;;,,;;;,''...',;;''':dKWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNo',;;;'.;lc;;,...,,;;,'..',;;;,;;;,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,;,,;;,,,;,,;;;;;;,'..'',;,'.'ckNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKl;oxxo,.';,;,...';,,,...',;,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,',;;;;;;;;;;;;,,,,'...';;,'.;xXMMMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWk;cKWKl..,;;;'. ..;;'...,,;,,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,;,.',;;;;;;;;;;;;;;;;;,'..',,,'.,dXMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWk,lKXk:',;;;,.....,,..',;,,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,;'.';;;;;;;;;;;;;;;;;;;,'..',,''.,xXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO;oWXd'';;,,,..'..'..',;;;;;'',;,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,,;;,;;,,..';;;,;;,,;;;;;,;;;;;;,'..',''..;kNMMMMMMMMMMMMMMMMMMMWOOWMWWMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXclNNx,';;;,...,'....,;,;;,;;'.,;,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,..,;;,;,,;'..';;,,;;;;;;;;;;;,,,;;;,'..,,....lXMMMMWMMMMMMMMMMMMMNllX0kOkkKWWMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWo;k0o..';;,...,,. .';,,;;;,;;'.';,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,,..';;;,;;;. .,;,,;;,;;;;;;;;'',;;,;;,'..,'...;OWWWWMMMMMMMMMMMMMWlcK00NXoxWWMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWW0;,l;...,;,..';;. .,;;,;;,;;;;..';,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,;'. ';;;,;;,. .,;;;,,;;;;;;;;'.,;,,,,;;'..,,...'kWMMMMMMMMMMMMMMMMO:dKKkdkXMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0l:c;. .,;,..';;,..,;,;;;,;;;,'..';,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,;. .';;,;;;'  ';;;;;;;;;;;;;'.';,'',;;;,..',....xNWMMMMMMMMMMMMWWW0xxxkXWMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWKolOOl...';,..,;;,..''',,;;;,,;'....;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,;,...';,,;,.. .';;,;;;;;;;;;,.';;'..,;,;;..','..'xWMMMMMMMMMMMMMMMMWWWMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWkcdKKo'..';,'',,,,. .,..,,;,;;;'.':..,;,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,...';,;,'.. .;;,;;;;;;;;;'.,;,;,..';,;,..',''.'OMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNd,l0Od,...,;;,,;,;' .'. .;;;,;;,..d0l.';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,;'...';;;''. .',;;;;;;;;;;'.';;;;,..';;;,..',''.:XMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWx':xxd;''.';;;,;;;,. .'. .;;;,;,.'xNW0,.;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,....';,,'.. .,;;;;;;;;;;,.';;,;;,..';,,,..,,''.oNMMMMMMWMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0,:xxxl,;..,;;;;;;;,.... .,;;,;,.'kNWWNo.';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,....,;,,.....;;;;;;;;;;,.';;,;;;,..,;;;,..,,,.,OWWMMMMWWMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWo,ONOd;:;.';;;;;;;;,...  .;,;;,.'kNWWNWK,.,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;'....,;,'....';;;;;;;;;,..;;,,;;;'..,;;;'..;,,.oNWWWNxccdOXWMWWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWX:;XN0l:c'.,;;;;,,;;;..'  ';;;,..xNWWWWWNd..;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;'....,;'.....,;;;;;;;;,..,;;,;;;;..';,;;..';;':KWWXc.:xkkkxkXWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMX;;XWKdlc..,;;;;;,;;,...  ';;;..dNWWWWWWWXl..,;;;,,;;,;;;;;;;;;;;;;;;;;,;;;;;;;;;;;;;;,.....;,.....';,,;;;,;,..,;;;;,;;,..,;;;,..,;,;kWMx.cNMWWWXxo0WMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWl,xXNOdc..,;;;;;;;;,..   .;,..oNWWWWWWWWWx. .;;,,,.';,;;,;,;;;;;;;;;;;;;;;;;;;;;;;;,;;,..'..,'.....,;,;;;;;,..,;;;;,;;,...;;,,'..,,,kMMx'xWMWWMMWkl0MMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMM0,.oKdcl..,;;;;;;;;;'    .;..oNWWWWWWWNKk,...;;,;,...,,;;;;;;;;;;;;;;;;,,,,;;;;;;;;;;;;'..'..,. ....;;;;;;;;'.,;;;;;;,;,..,;;;;. ..,kWMK:lWWMMWMWXoxMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNx:::ccok;.,;;;;;;;;;'.  ....dNNK0kxdollcldxkl,,;;;,...,;,;;;;;;;;;;,;,'....,;;;;;;;;;;;;..''.''.....,;;;,;;;'.,;;,;;,,;;..',,;;'. .'oNWWk:xNMMWMMXldWMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMWNKNMMMMMMMMMMWWMXdcxK00K00c.';;;;,;;;;.  ....dNW0kdoodxOKNNWWWNd,';;,;' .,;,;;;;;;;;,;;,'.......',;;,;;,;;,..'.... ....,;;,,,;'.';;,,;,,;,'..,;;;,. ..c0MMWOlokXWNKdoKMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWWKkol0MMMMMMMMMWWKllO0K0K000l..;;;;;;;;,.  ...xNWWWWWWWWWWWWWWWWWW0:'';,,..''';;;,,,,;;;;;;;;;;,,'.....',,;,;,..'... .'..,;;;;;;'.';,;;;;,;;,..';,,;. ..,xWMMMN0ddxxdkXMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMKkxldKWMMMMMMMMW0ccOK000000d,..,;,;;;,;.   ..;0WWWWWWWWWWWWWWWWWWWWNx;'',',oo;;c;,,,,,'...........','.......',...,'. .'..';;;;;;'..,,;;,;,;;;'..;;,;'....lXMMMMWMMWWWWMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMN0OKNWWMMMMMMMMWd,dK0K0K00O:....;,;;,,;.   ;dcOWWWWNWWWWWWWWWWWWNWWWWXxc,,c0WXOkxollloodxkkOOkkxol:;,,;codlc:::..';,. ''..,;;,;;,..,;,;,;,;;;,..;;,;,....'kWMMMMMMMWWMWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWWMMWWWWMMMMMMMMMMMKl:cokKKK0k,.'..,;,,,;'..  lkcONK0Oxdoollcc::;lONWWWWWWN0OKNWWWWWWWWWWWWWNWNWWWWWWWNK0kOXWWNNXXOookl. .,..,;,,;,,. .,,;;;;;;;,..,;;;,. .'.;0WWMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMWMMMWWMMMWWWMMMMMMMMMMWMWKxc:ckKKo..,'.',,,,;'....lk;:l;.....'.. .,clkXWWWNWWWWWWWWWWWWWWWWWWWWNWWNNklooddxkOKXNWWWWWWWNWWk, .,'.';,;;,,....,;;;;;;;;'',;;;;. .;'.;KWMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMWMMWKOOKXWMWMMMMMMMMMWMWWWWKO0XO;..,;,,,;,,;,'...,;.,;;cllc:;..';::lx0NWWWWWWWWWWWWWWWWWWWWWWWWNWWNOc.    ...,:coxkKNWWWW0:..,,',;;;;,;'...';;,;;;,;;,,;;;;. .,;'.:XWMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMWWXxddxkdo0WMMMMMMMMMMMMMMMMMMW0:..',,'..',;;,..'.':,;;cd:.cdoollool:,;kNWWWWNNWWWWWWWWWWWWWWWNWWWNOo;..;ll:,'......':lx0NKl. .;,,;;,,;;'.'..,;;,;;,;;,;;;;,...',;'.:KMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMNklxXMMMWxxWXKWMMMMMMMMMMMMMMMNd'..'.'lkd,.,;..'. ,clKk..,dXWWNOk0Ox:.;kXNNNWNNWNNNWNNNNNNNNNNNNN0l,',;oKWWN0o;,.....'''':l;. .;;;;;;;;;'.''..;;,;;;;;,;;;,'....';;,.;0WMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMWXolKWMMWWMNNWOckWMMMMMMMMMMMMMMKc..'..lNWNO:,,..,' .,oKl.;0NNNX0OXWWXx:,:kXNNNNNNNNNNNNNNNNNNNNNNK;.lxOXNWWWNX000kol:'.,looc,. .;;;;;;;;;'.',..';,;'.,;,;;,,..,'...,;,.,OWMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMNdcKMMMMMMMMWMK;lWMMMMMMMMMMMMMWk,..,..kWWWWx,..';'  .dx. ;kkkkxxkKXOkkl,:ONNXK0OO000OOKNXK00KKXNN0;'odk0XNNX0OO0XKkxkdl:,,l0O, .,;;,;;;;;,..;,..,,;..';,;;;'.';;,'..';,.'OWWMMMMMMMMMMMMMMMMMMM
MMMMMMMMK:dWWMMMMMMMMWx'dWWMMMMMMMMMMMMNo..,,.'OWWWNx'..;;. .'xd..;ooc;;cc::clook00kkkdolclc::lxkkkOO0KXXXNOl:,'ckOOkkkkkOKK0Okxxxl.:kc..,;;,,;;,;,..,;..,;;..';;,,,'..,;,;;'..,,.,kWMMMMMMMMMMMMMMMMMMM
MMMMMMMMNl:KWMMMMMWWNx,lXMMMMMMMMMMMMMM0:..;,.'0WWWXo..,;,. ..dklodlloodoldOXXKOxdlllc:c:ldxxxxkkxxxxxxkkOXNXXOc';ldxkkOkkKNNNNN0l,;k0c..,;;,;;;;;,..,;'..;;'.';,..'....,;;,,,..,,.,kWMMMMMMMMMMMMMMMMMM
MMMMMMMMWKoclxOK0OxoccxNMMMMMMMMMMMMMMWx..';;..oNWWX:.';;. . .:coONNNNNNNKOO00000kkO0OO0Oxoc,,cxkOOOOOOOO0KKXNXXOoc:c:,;ldodk0KKx,.xWKl..';,;;;;;;;..,;,..,;'.';,.....'..;;;;,,..',.'kWMMMMMMMMMMMMMMMMM
MMMMMMMMWWWXxllolllx0WMMMMMMMMMMMMMMMMX: .;,;,..lKNO'.,;,..:..oKWWWWNNNNNX00XXNXKxoooodl;;codl;:lcc::c::,l0XXNNXXNNXXXOo:;:okxc:;ckXWXo..';;;;,;;;;..';;...;'..;,. ...''.';,;;;,'.',.'kWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMWWWWWWMWWMMMMMMMMMMMMMMMWk..,;,,;:ld0No.';;..lo.;oodOXNWNNNXNNNNNXx;;llll:cx0K000OdodxkkkOOo,dXKK00OOOOKNNNXXNNNNX0O0XNNNx. .;;;;,;,;;'.';;,..;'.';'   ...,..,;,;,;;'.',.,OMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMWd..;;;;;,cxOd..,;;..OklO000KNNNNNNXNNNNNXc'x000K000000000000000000OlcddoooollccxXNNNN0x00kkkkkkOd'..;;;,,;,;;'..,,;..,..';.......''..;;,;;;,..,,.cNMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMX:.,,;;;,,,;;'..;,;.,ONXNNNNNNNNNNNNNNNNNO;'d00000000000000000000000OO00000000Oo:OWNNXolXWWMMWN0o;...;;;,;;,;;'..,,;..'..,;... .. .'..;;,;;;;,..,.,0MMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWx..;,;;,..'.'..';;;'.xWNWWNNNNNNNNNNNXXXo,cxO00000000000000000000000000OO00OOO0kd0WNWNxlkKNWMWWWx,. .;;;,,;;;;,..,;;'....,,... .'..'..,;,;;,;;'.'.'OMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMX:.,;;,;,..,....,;;;,.oNWWWWNNWWNNNWNNXNK;.x0OO0OOO00OO00000OOOOOOOO000O00OO0OO0OkO0XNWN0xddxkkxddo'.';;,',;;,;;..,;;'....;'.....'..'..';;;,;;;,...;XMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWx..,;,,;;..',. .,;;;,.,0WNWWWNWWWWWNWWNNx';k0OOOO00OOOOOOOOOOOOOOOOOOOOOOOO0OO0O0OxolcdKWNNKOOOOKNO' ';;'.';,;,,..';;'.. .;...',..'..'..;,,;;;,,. .xWMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXc .;,,;;;..';. .,;;;,..:0NWWNNWWWWWWWKXX:'d0O0OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00Od;;kNWWWWWWWWO' ';,'.';;;,,'.';;'.  .,. .,;..,.....;,,;;;,..'xNMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMX: .,;;,,;'..,,. .;;;,;,.':d0NWWWWWWWWKXK;'x0OOOO00OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00OOO0x.:XWWWWWWWWO..,;,,';;;;,;'..;;,.  .. .,;;,.',...';;;,'..'oKWWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNd...';;;,;...,,...,;,;;;,'.';lkKNWWWWWWNx,;dkO0OO0OOOOOOOOOOOOOOOOOOOOOOOOOOOOOkddolc:;;kNWWWWWWWWO..,;,,,;;;,,;,..;;,.  .. ';;;,'',,'',;;'...l0WMMWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKd,....',,,. .,,....',;;;;;,,..,:okKNWWNN0dolcloxO0OOOOOOOOOO0OOOO00K00OOOOOOO0OkdllodOXNWWWWWXNWWk..,,'.';;;;,;,..,;'. ....;;;;,'',;,,;,..,oKWMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMNOo:'.....'''',,'..'',;;;;;;;;,'..,:lxOXNWNNKkdx0K00000K00OOOOO00XNNNNXXXXXXXNNWWWWWWWWWNKkd:;lO0l..,. .,;,;;;;,..',...  .,;;;;;,'',,'..'oXMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXOxd:'.',,,,,,''',;,''....',,;,,'...,:cox0NWWWNNNNNNNNNXKKKXXNNWWWWWWWWWWWWWWWWNK0koc;'....,;;. ',. .;;,;;;;,. ';,.. .,;,;;;;,.....,ckNWMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNOoc;'..','',;;,,;,..,;,,'.....'',,,,'....;clxOKXNWWWWWWWWWWWWWWWWWWWWNXKOkdoc;'......',,'',,' .,'..,;,,,,;;;. .''..',,;,,'.',,';lxKWMWMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNx;..'',,,,''',cl;...,:oololol:'  .....',;:;'....',;coxOKXNWWWWWWWXklcc:;'...     .',,'......... .,'..;;,;;;,,,. ..,,'''',;cox0XNXXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
WWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMNo.';,,'',;'..,,:l,'cddollollol;',:cclc;'.,:;'.'.........';;:looddo:........,;'.  .....  ..........,..',;,,;;,,'. ..;oddxOKNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMX;.;,,,..,;'.',,okOO00Okxxddoollloooooddoc:,'.........',,,;'.'..,:' ..... ..',......''.   ..',;,..'' .,;;;,;,;,.. 'dKNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMMNc.';;,. .;'..:lx00000000000OOkkxdoooollllooll:;'....',,,,,'...';ol;,'...... .,,..',;,,,,..',,;;..'. .';;;;,,,,,..dWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMW0;.,;;'  ,'.'::oO0000000000000000Okxddoolooooooolc;'...,:;.. ..,:;;:cccc::;;,,;::;,''',;;....''......',,;;,;,,;,.dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0;.';,. ...';,clcloxOO000000000000000Okxdooooooooool:,'....ck0KKOdoc:;;,,,,:dKNKd;'. .''',:,....',....',;;;;,;:'dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMK;.';. ...,'.ckxdl''clldk0K0000000000000Okkxooooolloolc;,';cld0KXNNXOxddxOKNNWWO,.'.';clolol..:dl..';,;;;,;,cl,xMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWO,..'..,,,'.,:okl.ckxolccloxO0K000000000000xooooooooooool:,'';lxk0KKKKXNX0OOkxl;clolloloxk:.:Okc..';;;;;;;,dd,kMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMMWN0d,. .'';;,;;,:l:'cO00000kxocclodO0000000000OOOOOOOOkkxxdoooolccoxO00koccc:::cclolooolodkOo':OKk:...',;;,;',ko,0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNOdc,....',,;;;;,,:;',oO0000000000OkdllloxO00000000000000000K0kdc:;,:ldkO00OkkxdooooooodddxkO0o,lO00x:. .,;;,;;'l0::NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO:..',,;;;;;,,,,;,'..ck0000000000000KK00kxdddkO00000000000000Odc;,,,;;;,;cok0000OkxkkkkOOO000Oc;d00KKd;. ';;,,;,:Od'xMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWX:.,;;,,..,;;,..,'..:x0000000000K0000000000K0OkO00000000000Oxc;;;cllooool:;;;:lxO00000000000Od:ck00Okd;.  .,;;;;'.,'cNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWX:.,;;;'. .,;,....,x000000000000K0000000K000000000K000000kl'.'cooooloooooolll:;;;coxkO0000dl:..cc::;::,. .,;;,;;,.  ,OWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWo.';,,,. ....  .o0K00000000000000000000000000000K000Okxl,...,::ccllllooooooooolc:;;;::c:;,',..,loxk00:  .,;,,;,..',..xWMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMO..,;;,...   .:x0000000000000000000000000000KOooo;;:;;,;:c:;,,,,,,,,,,,',,,;;;::llc:;,,:clxOl'oKkx00Oc  ',;;;,..coc..lxKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXc .,;,..'.,ox0000000000000000000000000000000l'cc,',,;:::;:cccllllllccc:;;;,,,''';cc::;;;,;:'.oc'ck00l....''''..ok;.xNOd0WWWMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMWMMWX0Oxxd:. .;;,,:,;kK000000000000000000000000000K0xc..,:clc:;;,,'',,,;:cccccccccc::;;,,'''''',;;;,,..,.l000k,..',..,'  .:.'OWMNNMWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMWNKxc;,'''.',...,,','.l00000000000000000000000000000k:....',;;;,''''''''''''''''''',,,,,,,,,,,;;;;;;,,...;OK0k;,o;,c'.,o:.  .:0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMW0o;'........';,....;lo';O000000000000000000000000000Kk' ',;,,:dxo;,;;,;,,,,;;;;,,;;,,,,,,,,,,,,,,,,,,,'  .oK0xc:kKd'.co''cc. .;kXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMWWMMWk'.',,,;;;,..;;;,,.:OK0l:kK0000000000000000000000000KO:.;oddoox0Kx:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.  ,OK0kkOOxc;cO0d;.......:OWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMM0,,c,...',;. .;;,;oc;k00Ok000000000000000000000000000Oc.:kxodxOKK0kddol:;,,,,,,,,,,,,,,,,,,,,,,,,,;,,,,'. .l000K0xdldOO000ko:'.'. .lXMWNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMx'lo. ....'..,;,:oOkk00000000000000000000000000000000l.,ko;,,;ok0K0kddkOd:,,,,,,,,,,;;;;;;;;;;;::cccloloc.,OK00000000000K00Oc..'.  .cll::OWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMo.xx..;;'....',cx0000000000000000000000000kdk0000000o..xOocllclx00kdlldO0xddddddddxxxxxxxkkkkkOOO00000OOc.c000000000000000k;.','.. ..:OO,:XMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMd'x0:;;,,,,'..cO0000000000000000000000000kc;clk0000d. ,k0O000O000000000000OOOOOOOkkkkkkkxxxxxddddooolcc;..l00000000000000d'.';,. .....lXk;xWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWMWXKo.:dc;,;;'..,d00K000000000000000000000000Occkl:xK0d' .,lkO000OO000000kk0kl::::;;;;;;;;;;;;,;;;,,,,,,,,,.  ;OKK0000000000d.  .,,.  '.. .lX0ONMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMWN0dc:;..,;,,,..'oO00K00000000000000000000000000kcckdoOx;..,;,;clx0KOkO0000kdo:;,,,,,,,,,,,,,,,,,,,,,,,,,,,,'...,odk000000000d...  ',.. .'.  .l0NWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMWk:,,;,,;,,,..'lO000K0000000000000000000000000000Olcxkxl. ';,;,,:x0Ol:oO000o,,,,,,,,,,,,,,,,,,,,,,,,,,;,,,,,,...'.,kK0000000x'.','..,'....'.  .'lkXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMKl;;;,;;,,. .cO0000000K0000000000000000000000000000o:c:. ..',,,:xKOl;,;oOKOl,,,,;,,,,,,,,,,,,,,,,,,,,;;,''....':l:':k000000O; .,;;. .. .'........,cd0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMM0c,;;,;;,. .cO00000000000000000000000000000000000000x::::;'....'cc;..',;dkd:,,;;;,,,,;;;;;;;;;;;,''......',;clloooc,,cx0000l,c;.,:;.....,.....,'.',,;:d0WMMMMWMMMMMMMMWMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMk:,''.... .lO0000000000000000000000000000000000000000Ol;odl:,....     .,cc,........''''''''''.''''',,;:clooolloooolc;.'kK0kco00d;,,.. .',,.....;,,,,,,.'cx0NMWWWWWWWWWWMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWk,.....'. ,O00K0000000000000000000000000000000000000000d,.,,''',,,;;;;;cloolc:;,....;;;,,;;;::cllllooolllcc:;;;,,;;;:cdO00000000Odc;'...',,.  .',,,,,,;,'':oooolccccdKWMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMXc..:cdKKl.cO000000000000000000000000000000000000K00000kc,d0kkkkkxdooooooooolooolloxkkkxdoooooooooooddddoolccllodxOO000K000K00K00000koc:clc,...';,,,,,,,,:kN0kxkOOOc'kWMMMMMMMMMMMMMMMMMM
NNNNNNNNNNNNNNNNk',dOXNN0,.lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkOOkOko,,:x0OOOOOOkxdddoooolllllldkOOOOOxooolooooddxkkOOOOOOOOOOOOOOOOOkOOOOOOOkOOOOOOOOOOxl;'',,,,',,,,,c0XXXXXXXKdoKXNNNNNNNNNNNNNNNNNN
*/

