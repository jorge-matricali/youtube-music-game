$('#playlistForm').on('submit', function (ev) {
  ev.preventDefault()
  var playlistId = $('#playlistID').val()
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=50&playlistId=' + playlistId + '&key=' + api_key,
    dataType: 'json',
    success: function (data) {
      console.log(data)
      var items = []
      for (var i = 0; i < 5; i++) {
        var key = Math.floor(Math.random() * data.items.length)
        items.push('<li id="' + key + '">' + data.items[key].snippet.title + '</li>')
      }
      $('#lista').html(items.join(''))
    }
  })
})
