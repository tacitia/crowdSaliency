template = open('script_template.js', 'r')
image_list = open('image_list.txt')

line_counter = 0
set_counter = 0
file_counter = 0
for line in image_list:
	print file_counter
	print set_counter
	print line_counter
	line = line[7:]
	line = line.replace('\n', '')	
	if set_counter == 0 and line_counter == 0:
		script = open('script_' + str(file_counter) + '.js', 'w')
		script.write('var scene_images = new Array(3);\n scene_images[0] = new Array(20);\n scene_images[1] = new Array(20); \n scene_images[2] = new Array(20);\n')
		scene_cats = list()
	script.write('scene_images[' + str(set_counter) +'][' + str(line_counter) + '] = \'' + line + '\';\n')
	line_counter += 1
	if line_counter == 20:
		line_counter = 0
		first_pos = line.find('/')
		end_idx = first_pos + line[first_pos+1:].find('/')
		scene_cats.append(line[first_pos+1:end_idx+1])
		set_counter += 1
	if set_counter == 3:
		print scene_cats
		script.write('var scene_names = [\'' + scene_cats[0] + '\', \'' + scene_cats[1] + '\', \'' + scene_cats[2] + '\']')
		template.seek(0)
		script.write(template.read())
		script.close()
		set_counter = 0
		file_counter += 1	
			
template.close()
image_list.close()