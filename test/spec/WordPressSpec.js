var WordPress = require('../../lib/wordpress').WordPress;

describe('WordPress', function () {
    var blog;
    var config = {
        consumerKey: 'consumer_key',
        consumerSecret: 'foobar',
        accessToken: 'access_token',
        accessTokenSecret: 'access_token_secret',
        callBackUrl: 'http://craigcook.co.uk/auth/twitter/callback'
    };

    var error = function (code, data) {
        console.log('ERROR [%s]', code);
        if (done) {
            done();
        }
    };

    beforeEach(function (done) {
        blog = new WordPress(config);
        expect(blog).toBeDefined();
        expect(blog.oauth).toBeDefined();
        done();
    });

    it('should get posts', function (done) {
        blog.getPosts('boycook.wordpress.com', undefined, error,
            function (data) {
                expect(data.posts.length).toEqual(20);
                done();
            }
        );
    });
});
