/**
 * for increasing view count
 */
(function() {
    'use strict';
    function getPlayer() {
        return document.getElementById('c4-player') || document.getElementById('movie_player');
    }

    function checkRefresh() {
        if (getPlayer().getPlayerState() == 0) {
            location.reload();
        }
    }

    window.setInterval(checkRefresh, 1000);
})();