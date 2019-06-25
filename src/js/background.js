(() => {

    let lFollowX = 0
    let lFollowY = 0
    let x = 0
    let y = 0
    let friction = 1 / 30

    let $img = $('.main-image')

    function background_animate() {
        if(isMobile() === false) {
            x += ((lFollowX - x) * friction)
            y += (lFollowY - y) * friction

            x += 2

            // let translate = 'translate3d(' + x + 'px, ' + 0 + 'px, 0) scale(1)'

            $img.css({
                'background-position': `${x}% center`
            })

            window.requestAnimationFrame(background_animate)
        }
    }

    $(window).on('mousemove', $.debounce(100, function(e) {
        if(isMobile() === false) {
            let lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX))
            let lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY))
            lFollowX = (20 * lMouseX) / 100 // 100 : 12 = lMouxeX : lFollow
            lFollowY = (10 * lMouseY) / 100
        }
    }))

    background_animate()

    function isMobile() {
        return Modernizr.mq('only screen and (max-width: 600px)')
    }

})()
