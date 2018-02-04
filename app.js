// define EasyHTTP2 Library
const http = new EasyHTTP;

// display profile pic
const steamAvatar = document.querySelector('#steamAvatar');
// display soloMMR
const soloMMR = document.querySelector('#soloMMR');
// display teamMMR
const teamMMR = document.querySelector('#teamMMR');
//display
const estimateMMR = document.querySelector('#estimateMMR');
// playerTag
const tagName = document.querySelector('#tagName');
// playerLink
const playerLink = document.querySelector('#steamIDLink');



document.querySelector('#steamForm').addEventListener('submit', (e) => {

    e.preventDefault();

    const inputValue = document.querySelector('.steamID').value;

    console.log(inputValue);

    if(inputValue != '') {
        let steamID = inputValue.value;
        // Get Users
        const user = http.get('https://api.opendota.com/api/players/' + inputValue + '')
        // const user = http.get('https://api.opendota.com/api/live')
            .then(data => {
                console.log(data);
                soloMMR.innerHTML = data.solo_competitive_rank;
                teamMMR.innerHTML = data.competitive_rank;
                estimateMMR.innerHTML = data.mmr_estimate.estimate;
                steamAvatar.src = data.profile.avatarfull;
                tagName.innerHTML = data.profile.personaname;
                playerLink.href = data.profile.profileurl;
                console.log(data);

            })
            .catch(err => soloMMR.innerHTML = 'Something went wrong');

    } else {

        const errorMsg = document.createTextNode("Please enter a valid steamID");
        const errEl = document.querySelector('.errorMsg');
        errEl.appendChild(errorMsg);
        setTimeout( () => errEl.removeChild(errorMsg), 2500);
    }

});
