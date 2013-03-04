var WordPress = require('../../lib/wordpress').WordPress;

describe('WordPress', function() {
	var blog;
	var config = {
		consumerKey: 'consumer_key',
		consumerSecret: 'foobar',
		accessToken: 'access_token',
		accessTokenSecret: 'access_token_secret',
		callBackUrl: 'http://craigcook.co.uk/auth/twitter/callback'
	};

	beforeEach(function(done) {
		blog = new WordPress(config);
		expect(blog).toBeDefined();
		expect(blog.oauth).toBeDefined();
		done();
	});

	it('should get posts', function(done) {
		blog.getPosts('boycook.wordpress.com', undefined, {}, function(data) {
			data = JSON.parse(data);
			expect(data.posts.length).toEqual(18);
			done();
		});
	});
	
	it('should handle error correctly', function(done) {
		blog.getPosts('boycookxxxxxxxxx.wordpress.com', undefined, function(err, response, body) {
			expect(err.statusCode).toEqual(404);
			if (done) {
				done();
			}
		}, {});
	});
});
