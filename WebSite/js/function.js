
var FriendID = new Array();
var FriendName = new Array();
var FriendMatrix = new Array();
var FriendNumber = 0;

var MutualFriendNumber = new Array();
var MutualFriendFlag = 0;

var FriendLists = new Array();
var FriendListMemberID = new Array();
var FriendListsMemberName = new Array();

function initialFriendMatrix(number){
	for (var i = 0; i < number; i++) {
		FriendMatrix[i] = new Array();
		for (var j = 0; j < number; j++) {
			FriendMatrix[i][j] = 0;
		}
	}
}

function getFriends(user_id) {
	FB.api('/'+user_id+'/friends', function(response) {
		
		FriendNumber = response.data.length;
		initialFriendMatrix(FriendNumber);

		for (var n = 0; n < response.data.length; n++) {
			FriendID[n] = response.data[n].id;
			FriendName[n] = response.data[n].name;
			MutualFriendFlag = 0;
			getMutualFriends(user_id,FriendID[n]);
		}
					
	});
}

function getFriendLists(user_id) {
	FB.api('/'+user_id+'/friendlists', function(response) {
		for (var n = 0; n < response.data.length; n++) {
			FriendLists[n] = response.data[n].id;
			getFriendListMembers(response.data[n].id);
		}
	});
}
function getFriendListMembers(user_id) {	
	FB.api('/'+user_id+'/members', function(response) {
		FriendListMemberID[FriendLists.indexOf(id)] = new Array();
		FriendListsMemberName[FriendLists.indexOf(id)] = new Array();
		for (var n = 0; n < response.data.length; n++) {			
			FriendListMemberID[FriendLists.indexOf(id)][n] = response.data[n].id; 
			FriendListsMemberName[FriendLists.indexOf(id)][n] = response.data[n].name
		}
	});
}

function getMutualFriends(user_id,friend_id) {
	FB.api('/' + user_id + '/mutualfriends?user=' + friend_id, function(response) {
		for (var n = 0; n < response.data.length; n++) {
			FriendMatrix[FriendID.indexOf(friend_id)][FriendID.indexOf(response.data[n].id)] = 1;
		}
		MutualFriendNumber[FriendID.indexOf(friend_id)] = response.data.length;
		MutualFriendFlag = MutualFriendFlag + 1;
	});
}
		
var FriendStatuses = new Array();
var FriendMessages = new Array();
var FriendOfFriendLikes = new Array();
var FriendOfFriendLikesMatrix = new Array();
var Temp = new Array();

function initialFriendLikeMatrix(n){
	for (var i=0; i<n; i++) {
		FriendOfFriendLikesMatrix[i] = new Array();
		for (var j=0; j<n; j++) {
			FriendOfFriendLikesMatrix[i][j] = 0;
		}
	}
}

function getFriendStatuses(id) {
	FB.api('/'+id+'/statuses', function(response) {
		if (Temp.indexOf(response.data[0].from.id) == -1) {
			FriendStatuses.push(response.data[0].from.id+','+response.data[0].from.name+','+response.data[0].message);
			Temp.push(response.data[0].from.id);
		}
	});
}
function getFriendMessages(id) {
	FB.api('SELECT status_id, message FROM status WHERE uid='+id, function(response) {
		FriendMessages = new Array();	
		for (var n=0; n<response.data.length; n++) {
			FriendMessage.push(response.data[n].message);	
		}
	});
}
function getFriendRelationByFriend(id1,id2){
	FB.api({
   		method: 'fql.multiquery',
   		queries: {
    		query1: 'SELECT uid, status_id, message FROM status WHERE uid='+id1,
    		query2: 'SELECT object_id,object_type,user_id FROM like WHERE object_id IN (SELECT status_id FROM #query1 ) and user_id='+id2
   		}
  	},function(response) {
  		if (typeof(FriendOfFriendLikes[FriendID.indexOf(response[0].fql_result_set[0].uid)] ) == 'undefined' || 
  			FriendOfFriendLikes[FriendID.indexOf(response[0].fql_result_set[0].uid)]  == null) {
  			FriendOfFriendLikes[FriendID.indexOf(response[0].fql_result_set[0].uid)] = new Array();
  		}
  		FriendOfFriendLikes[FriendID.indexOf(response[0].fql_result_set[0].uid)][FriendID.indexOf(response[1].fql_result_set[0].user_id)] = response[1].fql_result_set;
		FriendOfFriendLikesMatrix[FriendID.indexOf(response[0].fql_result_set[0].uid)][FriendID.indexOf(response[1].fql_result_set[0].user_id)] = response[1].fql_result_set.length;
	});
	FB.api({
   		method: 'fql.multiquery',
   		queries: {
    		query1: 'SELECT uid, status_id, message FROM status WHERE uid='+id2,
    		query2: 'SELECT object_id,object_type,user_id FROM like WHERE object_id IN (SELECT status_id FROM #query1 ) and user_id='+id1
   		}
  	},function(response) {	
  		if (typeof(FriendOfFriendLikes[FriendID.indexOf(response[0].fql_result_set[0].uid)]) == 'undefined' || 
  			FriendOfFriendLikes[FriendID.indexOf(response[0].fql_result_set[0].uid)] == null) {
  			FriendOfFriendLikes[FriendID.indexOf(response[0].fql_result_set[0].uid)] = new Array();
  		}
  		FriendOfFriendLikes[FriendID.indexOf(response[0].fql_result_set[0].uid)][FriendID.indexOf(response[1].fql_result_set[0].user_id)] = response[1].fql_result_set;
		FriendOfFriendLikesMatrix[FriendID.indexOf(response[0].fql_result_set[0].uid)][FriendID.indexOf(response[1].fql_result_set[0].user_id)] = response[1].fql_result_set.length;
	});
}

function RGB2Color(r,g,b)
{
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n)
{
	var nybHexString = "0123456789ABCDEF";
	return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

