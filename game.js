/* Reproductor de youtube */
var tag, firstScriptTag, player
tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

function onYouTubeIframeAPIReady () {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 0,
      showinfo: 0,
      autohide: 1,
      modestbranding: 1,
      vq: 'small'
    },
    events: {
      'onError': function () {
        console.log('The selected song cannot be played. Skipping to the next song...')
        pickSongs(playlistId)
      }
    }
  })
}

var selected, playlistId

function check (choice) {
  if (selected === parseInt($(choice).val())) {
    alert('GOOD! :D')
  } else {
    alert('BAD :(')
  }
  pickSongs(playlistId)
}

function pickSongs(playlist) {
  $('#lista').html()
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=50&playlistId=' + playlist + '&key=' + api_key,
    dataType: 'json',
    success: function (data) {
      console.log(data)
      var items = []
      var options = []
      for (var i = 0; i < 5; i++) {
        var key = Math.floor(Math.random() * data.items.length)
        items.push('<li class="list-group-item" id="' + key + '"><button class="btn btn-primary btn-block" onclick="check(this)" value="' + key + '">' + data.items[key].snippet.title + '</button></li>')
        options.push(key)
      }
      $('#lista').html(items.join(''))
      selected = options[Math.floor(Math.random() * options.length)]
      player.loadVideoById({
        videoId: data.items[selected].snippet.resourceId.videoId,
        startSeconds: 60,
        endSeconds: 70,
        suggestedQuality: 'small'
      })
    }
  })
}

$('#playlistForm').on('submit', function (ev) {
  ev.preventDefault()
  playlistId = $('#playlistID').val()
  pickSongs(playlistId)
})
