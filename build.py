from json import load as load_json
from sass import compile as compile_sass
from jinja2 import Environment, DictLoader, select_autoescape
from bs4 import BeautifulSoup as soup
import re

with open("nostalgia.scss", "r") as scss_source:
	with open("docs/nostalgia.css", "w") as css_source:
		css_source.write(compile_sass(string=scss_source.read()))

with open("design.scss", "r") as scss_source:
	with open("docs/design.css", "w") as css_source:
		css_source.write(compile_sass(string=scss_source.read()))

with open('data.json', 'r') as data_source:
	data = load_json(data_source)

with open('design.html', 'r') as template_source:
	template = template_source.read()

with open('nostalgia.html', 'r') as template_source:
	old_template = template_source.read()

env = Environment(
	loader=DictLoader({'index.html': template, 'nostalgia.html': old_template}),
	trim_blocks=True,
	lstrip_blocks=True,
	autoescape=select_autoescape()
)

with open("docs/index.html", "w") as html_source:
	rendered = soup(env.get_template("index.html").render(data=data), 'html.parser').prettify()
	html_source.write(re.sub(r'^(\s+)', lambda m: '\t' * len(m.group(1)), rendered, flags=re.MULTILINE))

with open("docs/nostalgia.html", "w") as html_source:
	rendered = soup(env.get_template("nostalgia.html").render(data=data), 'html.parser').prettify()
	html_source.write(re.sub(r'^(\s+)', lambda m: '\t' * len(m.group(1)), rendered, flags=re.MULTILINE))
