#!/bin/env node

var request = require('request');
var nconf = require('nconf');

module.exports = {

    configura: function (apiKey, appId, small_icon, large_icon, big_picture) {
        nconf.use('file', {
            file: './config.json'
        });
        nconf.load();
        nconf.set('apiKey', apiKey);
        nconf.set('appId', appId);
        nconf.set('small_icon', small_icon);
        nconf.set('large_icon', large_icon);
        nconf.set('big_picture', big_picture);
    },

    enviarPush: function (titulo, conteudo, users) {

        request({
            headers: {
                'Authorization': 'Basic ZWY1ZGMzNGQtZGNlMy00ODU1LWFlNzgtZjQ5ZDAzZmM1Y2Iz',
                'Content-Type': 'application/json'
            },
            url: 'https://onesignal.com/api/v1/notifications',
            method: 'POST',
            json: {
                'app_id': nconf.get('appId'),
                'included_segments': users,
                'headings': {
                    'en': titulo
                },
                'contents': {
                    'en': conteudo
                },
                'small_icon': nconf.get('small_icon'),
                'large_icon': nconf.get('large_icon'),
                'big_picture': nconf.get('big_picture')
            }
        }, function (error, response, body) {
            if (error) {
                console.log('Erro ao enviar a mensagem: ', error);
                return false;
            } else if (response.body.error) {
                console.log('Erro: ', response.body.error);
                return false;
            } else {
                console.log('Mensagem enviada com sucesso para ' + users.length + ' usuários.');
                return true;
            }
        });

    }
}