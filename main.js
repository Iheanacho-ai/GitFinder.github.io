let button = document.querySelector(".submit");
let searchBar = document.querySelector(".search-bar");
let spinner = document.querySelector(".spinners");
let userImage = document.querySelector(".img-profile")
let name = document.querySelector(".Username-name");
let userName = document.querySelector(".Username-username");
let userDetails = document.querySelector(".user-details");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let company = document.querySelector(".company");
let companyName = document.querySelector(".company-name");
let place = document.querySelector(".location");
let locationName = document.querySelector(".location-name");
let website = document.querySelector(".website");
let websiteName = document.querySelector(".website-name");
let twitter = document.querySelector(".twitter");
let twitterName = document.querySelector(".twitter-name");
let repoStat = document.querySelector(".repo-stat");
let main = document.querySelector(".container-color");
let repositoriesMain = document.querySelector(".repositories-stat");

const userProfile = () => {
    main.style.display = "none";
    spinner.style.display = "block";
    async function getUsers() {
        try{
            const users = await fetch(`https://api.github.com/users/${searchBar.value}`);
            const data = await users.json();

        
            userImage.setAttribute("src", data.avatar_url);
            name.innerHTML = data.name;
            userName.innerHTML = data.login;
            userDetails.innerHTML = data.bio;
            followers.innerHTML = data.followers;
            following.innerHTML = data.following;
            repoStat.innerHTML = data.public_repos;
            

            if (data.company !== null) {
               companyName.innerHTML = data.company;
            } else {
               company.innerHTML= "";
            }
            if (data.location  !== null) {
               locationName.innerHTML = data.location;
            } else {
               place.innerHTML= "";
            }
            if (data.hasOwnProperty(website)) {
                websiteName.innerHTML = data.blog;
                console.log(data.website);
            } else {
               website.innerHTML= "";
            }
            if (data.twitter_username  !== null) {
                twitterName.innerHTML = data.twitter_username;
            } else {
               twitter.innerHTML= "";
            }
        
            const userRepo = await fetch(`https://api.github.com/users/${searchBar.value}/repos`);
            const RepoDatas = await userRepo.json();

            repositoriesMain.innerHTML= "";

            RepoDatas.map(RepoData => {
                let createRepoDiv = document.createElement("div");
                createRepoDiv.setAttribute("class", "RepoDataDiv");

                let RepoName = document.createElement("h3");
                RepoName.setAttribute("class", "repo-name");

                let RepoNameText = document.createTextNode(RepoData.name);

                let starForkDiv = document.createElement("div");
                starForkDiv.setAttribute("class", "starForkDiv");

                let StarDiv = document.createElement("div");
                StarDiv.setAttribute("class", "StarDiv");

                let Star = document.createElement("i");
                Star.setAttribute("class", "far fa-star repo-star");

                let StarNumP = document.createElement("p");
                let StarNum = document.createTextNode(RepoData.stargazers_count);

                let ForkDiv = document.createElement("div");
                ForkDiv.setAttribute("class", "ForkDiv");

                let Fork = document.createElement("i");
                Fork.setAttribute("class", "fas fa-code-branch repo-fork");

                let ForkNumP = document.createElement("p");
                let ForkNum = document.createTextNode(RepoData.forks);

                let WatchDiv = document.createElement("div");
                WatchDiv.setAttribute("class", "WatchDiv");

                let Watch = document.createElement("i");
                Watch.setAttribute("class", "fas fa-eye repo-eye");

                let  WatchNumP = document.createElement("p");
                let  WatchNum = document.createTextNode(RepoData.watchers);
    


                RepoName.appendChild(RepoNameText);
                createRepoDiv.appendChild(RepoName);

                StarNumP.appendChild(StarNum);
                StarDiv.appendChild(Star);
                StarDiv.appendChild(StarNumP);
    
                ForkNumP.appendChild(ForkNum);
                ForkDiv.appendChild(Fork);
                ForkDiv.appendChild(ForkNumP);

                WatchNumP.appendChild(WatchNum);
                WatchDiv.appendChild(Watch);
                WatchDiv.appendChild(WatchNumP);


                starForkDiv.appendChild(StarDiv);
                starForkDiv.appendChild(ForkDiv);
                starForkDiv.appendChild(WatchDiv);

                createRepoDiv.appendChild(starForkDiv);

                repositoriesMain.appendChild(createRepoDiv);
            })
        }catch(error){
            main.innerHTML = "";
            let errorDiv = document.createElement("div");
            errorDiv.setAttribute("class", "errorDiv");

            let errorName = document.createElement("h3");
            let errorNameText = document.createTextNode(error);
            let errorHelp = document.createElement("p");

            let errorHelpText = document.createTextNode("Hey! Please crosscheck the username entered, your internet settings and try again.");

            errorName.appendChild(errorNameText);
            errorHelp.appendChild(errorHelpText);
            errorDiv.appendChild(errorName);
            errorDiv.appendChild(errorHelp);

            main.appendChild(errorDiv)

        }
        

        spinner.style.display = "none";
        main.style.display = "block";
        searchBar.value = "";

        
    }
    

    
    getUsers();

}



button.addEventListener("click", userProfile);
