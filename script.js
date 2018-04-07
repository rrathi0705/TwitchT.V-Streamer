
$(document).ready(function(){
  var streamers = [
    'storbeck',
    'terakilobyte',
    'beohoff',
    'RobotCaleb',
    'thomasballinger',
    'noobs2ninjas',
    'habathcx',
    'riotgames',
    'sodapoppin',
    'OGNGlobal',
    'ongamenet',
    'joindotared',
    'faceittv',
    'taketv',
    'versuta',
    'Voyboy',
    'wingsofdeath',
    'towelliee',
    'defrancogames',
    'shadbasemurdertv',
    'yogscast',
    'Imt_wildturtle',
    'magic',
    'streamerhouse',
    'dhingameclient',
    'wcs_europe',
    'sing_sing',
    'roomonfire',
    'onemoregametv',
    'dreamleague',
    'syndicate',
    'saintvicious',
    'brunofin',
    'comster404',
    'freecodecamp',
  ];

	function clearPage(){
		$(".list").empty();	
	}
	function CreatePageOnline(data){
		for(var i = 0;i<data.length;i++){
		var logo = data[i].stream.channel.logo	
		var bioUrl ='https://placeholdit.imgix.net/~text?txtsize=15&txt=' + data[i].stream.channel.bio + '&w=300&h=200';
		var previewUrl = data[i].stream ? data[i].stream.preview.medium : bioUrl;
	    var language = data[i].stream.channel.broadcaster_language;
	    var viewers = data[i].stream.viewers;
	    var twitchUrl = 'https://www.twitch.tv/' + data[i].stream.channel.name
	    var displayName = data[i].stream.channel.display_name
      	$('.list').append('<li class="animated zoomIn"><a href="' +
      twitchUrl +
      '" class="card cardSize"  target="_blank" ><div class="card-header"><div class = "logoImageLeft"><img src="' +
      logo +
      '" alt="logo" /></div><div class="nameRight">' + 
      displayName +'</div></div><div class="card-body"><img src="' +
      previewUrl +
      '" alt="preview" class="card-title"/><div class="card-footer"><span>Language:'+language +
      '    Viewers:'+viewers +
        '</span></div></a></li>');
	}
	}
	function CreatePageOffline(data){
		for(var i = 0;i<data.length;i++){
		var logo = "https://thumbs.dreamstime.com/b/red-question-mark-sign-white-background-d-rendering-red-question-mark-sign-white-background-d-rendering-100492747.jpg";
		var name = data[i]._links.channel.split('/').pop();
		var link = "https://www.twitch.tv/" + name;
		$('.list').append('<li class = "animated zoomIn"><a href="' + link +
		 '" class = "card cardSize" target = "_blank"><div class="card-header channelName">' +
      name +'</div><div class="offlineImage card-body"><img src=' +
      logo + 'alt = "logo" class = "img-responsive"></div></a>');
	}
}
	function seperateStream(onl,off,both){
	$(':radio').on('change',function(e){
		switch(e.target.value){
			case 'online':
				clearPage();
				CreatePageOnline(onl);
				break;
			case 'offline':
				clearPage();
				CreatePageOffline(off);
				break;
			case 'all':
				clearPage();
				CreatePageOnline(onl);
				CreatePageOffline(off);
				break;
		}
	});
	}
	function makeURL(channelName){	
		return " https://wind-bow.glitch.me/twitch-api/streams/" + channelName;
	}
	var onl = [];
	var off = [];
	var both = [];
	streamers.forEach(function(channel){
		$.getJSON(makeURL(channel),function(data){
			if(data.stream==null)
				{
					off.push(data);
					both.push(data);
				}
			else{
				onl.push(data);
				both.push(data);
			}
		});
	});
	seperateStream(onl,off,both);
});

