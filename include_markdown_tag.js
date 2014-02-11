var fs   = require('fs'),
  path = require('path'),
  swig = require('swig'),
  _ = require('lodash');

/**
 * Include markdown tag
 *
 * Syntax:
 *   {% include_markdown path/to/file %}
 */

module.exports = function(args, content){
	var render = hexo.render,
	  	sourceDir = hexo.source_dir,
		arg = args.join(' ');
		
	arg += ".md";
	var local = path.join(sourceDir, arg);
	
	// Exit if the source file doesn't exist
	if (!fs.existsSync(local)) return local;
	
	hexo.extend.tag.list().forEach(function(tag){
		swig.setTag(tag.name, tag.parse, tag.compile, tag.ends, true);
    	});
	
	var data = {};
	data.content = fs.readFileSync(local, 'utf8');
	data.content = swig.compile(data.content)(data);
	
	return render.renderSync({text: data.content, engine: 'markdown'});
};