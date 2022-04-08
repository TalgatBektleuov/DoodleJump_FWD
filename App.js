document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    const score_result = document.createElement('div')
    let doodlerLeftSpace = 50 
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let isGameOver = false
    let platforms = []
    let upTimerId 
    let downTimerId
    let isJumping = false
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId 
    let rightTimerId 
    let upTime
    let score = 0
    function createScore(){
        grid.appendChild(score_result)
        score_result.classList.add('score')

    }
    function createDoodler(){
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left

        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }
    function updateScore(){
        score_result.innerHTML = score
    }
    class Platform {
        constructor(newPlatformBottom){
            this.bottom = newPlatformBottom
            this.left = Math.random()*315
            this.visual = document.createElement('div')

            const visual = this.visual 
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
          
        

        }
    }

    function createPlatforms(){
       
        for (let i=0;i<5;i++){
            
            let platformGap = 600/5
        
            let newPlatformBottom = 100 + i * platformGap
            let newPlatform = new Platform(newPlatformBottom)
            platforms.push(newPlatform)
            
                
            
        }
        console.log(platforms)
    }

    function movePlatforms(){
        if (doodlerBottomSpace > 580 && doodlerBottomSpace<680){
            platforms.forEach(platform => {
                platform.bottom -= 40
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
                
            })
            
            
            
            for(let i=0;i<4;i++){
                let firstPlatform = platforms[i].visual
                firstPlatform.classList.remove('platform')
                platforms.shift()
                let newPlatform = new Platform(600+i*120)
                platforms.push(newPlatform)
            }
        
            score += 4
            updateScore()
        
            

        }
        // if (doodlerBottomSpace > 480 && doodlerBottomSpace<=580){
        //     platforms.forEach(platform => {
        //         platform.bottom -= 30
        //         let visual = platform.visual
        //         visual.style.bottom = platform.bottom + 'px'
                
        //         if(platform.bottom < 0){
                    
            
        //         }
                
        //     })
        //     for(let i=0;i<3;i++){
        //         let firstPlatform = platforms[i].visual
        //         firstPlatform.classList.remove('platform')
        //         platforms.shift()
        //         let newPlatform = new Platform(600+i*120)
        //         platforms.push(newPlatform)
        //     }
        
        //     score += 3

        // }
        // else if (doodlerBottomSpace > 380 && doodlerBottomSpace<=480){
        //     platforms.forEach(platform => {
        //         platform.bottom -= 20
        //         let visual = platform.visual
        //         visual.style.bottom = platform.bottom + 'px'
        //         if(platform.bottom < 0){
                    
            
        //         }
                
                
        //     })
        //     for(let i=0;i<2;i++){
        //         let firstPlatform = platforms[i].visual
        //         firstPlatform.classList.remove('platform')
        //         platforms.shift()
        //         let newPlatform = new Platform(600+i*120)
        //         platforms.push(newPlatform)
        //     }
        
        //     score += 2

        // }
        else if (doodlerBottomSpace > 200 ){
            platforms.forEach(platform => {
                platform.bottom -= 10
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
                if(platform.bottom < 0){
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                    score += 1  
                    updateScore()
                }
            })

        }
        
    }

    function gameOver(){
        console.log('Game Over!')
        isGameOver = true
        
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = "<br />"+"<br />"+"<br />"+"Game over!" + "<br />"+ "You scored: " + score
        
        clearInterval(downTimerId)
        clearInterval(upTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
        let button = document.createElement('button')
        
        
        button.style.height = "40px";
        button.style.width = "80px";
        button.style.position = "absolute"
        button.style.bottom = "300px";
        button.style.color = 'black';
        button.style.fontFamily = 'Signika';
        button.style.fontSize="16px";
        button.innerHTML = 'Play again!'
        grid.appendChild(button)
        
       
        function refreshPage(){
            console.log("Key pressed")
            window.location.reload();
        } 
        button.onclick = refreshPage
        function playAgain(e){
            window.location.reload;
            
        }
        document.addEventListener('keyup', playAgain)

        
    }
    function fall(){
        clearInterval(upTimerId)
        isJumping = false
        function down(){
            doodlerBottomSpace -= 10
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if(doodlerBottomSpace <= 0){
                gameOver()
            }
            platforms.forEach(platform => {
                if((doodlerBottomSpace>=platform.bottom) && 
                (doodlerBottomSpace<= platform.bottom+15) &&
                ((doodlerLeftSpace+60)>=platform.left) &&
                (doodlerLeftSpace<=platform.left+85) &&
                !isJumping
                )
                {
                    console.log('landed')
                    
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })
        }
        downTimerId = setInterval(down,30) 

    }
    function stayUp(){
        console.log("staying up")
    }
    function jump(){
        clearInterval(downTimerId)
        clearInterval(upTime)
        isJumping = true
        function up(){
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startPoint + 200){
                fall()
            }   
            if (doodlerBottomSpace >= 515){
                doodlerBottomSpace -= 30
                upTime = setInterval(stayUp, 1000)
                fall()

            }

        }
        upTimerId = setInterval(up, 30)
    }
    function moveLeft(){
        if (!isGameOver){
            if (isGoingRight){
                clearInterval(rightTimerId)
                
                isGoingRight = false
            }
            isGoingLeft = true
            
            
            leftTimerId = setInterval(function(){
                if(doodlerLeftSpace >=0 ){
                    doodlerLeftSpace -= 10
                    doodler.style.left = doodlerLeftSpace + 'px'
                }
                else{
                    doodlerLeftSpace = 305
                    doodler.style.left = 305 + 'px'
                 
                }
                

            }, 30)
            // if(doodlerLeftSpace >=0 ){
            //     doodlerLeftSpace -= 15
            //     doodler.style.left = doodlerLeftSpace + 'px'
            // }
        }
    }
    function moveRight(){
        if (!isGameOver){
            if (isGoingLeft){
                clearInterval(leftTimerId)
                
                isGoingLeft = false
            }
            
            isGoingRight = true
            rightTimerId = setInterval(function(){
                if(doodlerLeftSpace <= 300){
                    doodlerLeftSpace += 10
                    doodler.style.left = doodlerLeftSpace + 'px'
                }
                else{
                    doodlerLeftSpace = 40
                    doodler.style.left = 40 + 'px'
                   
                }

            }, 30)
            // if(doodlerLeftSpace <= 340){
            //     doodlerLeftSpace += 15
            //     doodler.style.left = doodlerLeftSpace + 'px'
            // }
        }
    }
    function moveStraight(){
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
        isGoingLeft = false
        isGoingRight = false
        
    }
    function control(e){
        if(e.key === "ArrowLeft" && !isGoingLeft){
            moveLeft()
        }
        else if(e.key === "ArrowRight" && !isGoingRight){
            moveRight()
        }
        else if(e.key === "ArrowUp"){
            moveStraight()
        }
    }
    function stop(e){
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
        isGoingLeft = false
        isGoingRight = false
    }
    function start(){
        isGameOver = false
        if (!isGameOver){
            createPlatforms()
            createDoodler()
            createScore()
            setInterval(movePlatforms, 30)
            jump()
            document.addEventListener('keydown',control)
            document.addEventListener('keyup', stop)
        }
    }
    //button
    start()

})