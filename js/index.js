document.addEventListener("DOMContentLoaded", function() {
    
//select form
const form = document.querySelector("#github-form")
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const userInput = document.querySelector("#search").value
    const input = userInput.split(' ').join('');

    fetch('https://api.github.com/search/users?q='+input)
.then(response => response.json())
.then(data =>{
    console.log(data);
    const item = data.items;
     console.log(item);

    const repoclick = document.createElement("p")
    repoclick.innerHTML = "<em><b><u>click the user name to access the user repository<u><b></em>";
    // console.log(repoclick);

    document.body.appendChild(repoclick);
        item.forEach(function(entry) {
            let userInfo = entry;
            // console.log(userInfo);
            
            const username = document.createElement("h2")
            username.innerText = userInfo.login;
            username.addEventListener('click', () =>{
                fetchDetails()

            })
   
          
            // function onClick() {
            //     fetchDetails()
            // }
            
            
            // //fetching repo details
            function fetchDetails () {
                     // https://api.github.com/users/octocat/repos
                // fetch( `https://api.github.com/users/${username.login}/repos`)
                fetch( `https://api.github.com/users/${input}/repos`)

                .then(response => response.json())
                .then(data=>{
                    console.log(data)
                    //disclaimer
                    const repoheading = document.createElement("h3")
                        repoheading.textContent = "Repository list"; 
                        console.log(repoheading);
                        document.body.appendChild(repoheading);

                    data.forEach(function(repo){
                        let repoInfo = repo;
                        console.log(repoInfo);
                        
                        
                        const repoList = document.createElement('ul')
                        // repoList.style.type = "square";
                        document.body.appendChild(repoList);
                        console.log(repoList);
                        
                        

                        const repoName = document.createElement("li")
                        repoName.innerText = repoInfo.name;
                        // console.log(repoName);
    
                        const repoFullName = document.createElement("li")
                        repoFullName.innerText = repoInfo.full_name;
    
                        repoList.appendChild(repoName)
                        repoList.appendChild(repoFullName)
                    })
                    
                })
            }
            
            // console.log(username);
            
            const avatar = document.createElement("img")
            avatar.src=userInfo.avatar_url;
            // avatar.style.textAlign = "center"
            
            const link = document.createElement("a")
            link.textContent="view profile"
            //setAttribute of target in link tag and a assign _blank so as open in a new tab when the link is clicked on.
            link.setAttribute("target", "_blank");
            
            link.href = userInfo.html_url;
            // console.log(link)
            
            document.body.appendChild(username)
            document.body.appendChild(avatar)
            document.body.appendChild(link)
            document.body.style.textAlign = "center"

          });
        
       
    
  })
// form.reset();
})


  });
