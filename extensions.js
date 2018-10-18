_.mixin({
    key: function() {
        return 'e958d597cd26dd893e0673d94c649ee3'
    },
    appId: function(key) {
        return {
            id: '&APPID=' + key
        }
    },
    titleCase: function(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
    }
});