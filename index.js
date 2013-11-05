var fs   = require('fs'),
  path = require('path');

/**
 * Include markdown tag
 *
 * Syntax:
 *   {% include_markdown path/to/file %}
 */

hexo.extend.tag.register('include_markdown', function(args, content) {
	var render = hexo.render,
	  	sourceDir = hexo.source_dir,
		arg = args.join(' ');
		
	arg += ".md";
	var local = path.join(sourceDir, arg);
	
	// Exit if the source file doesn't exist
	if (!fs.existsSync(local)) return local;
	
	var code = fs.readFileSync(local, 'utf8');
	return render.renderSync({text: code, engine: 'markdown'});
});