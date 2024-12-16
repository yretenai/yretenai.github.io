from json import load as load_json
from sass import compile as compile_sass
from jinja2 import Environment, DictLoader, select_autoescape
from bs4 import BeautifulSoup as soup
import re

with open("design.scss", "r") as scss_source:
	with open("docs/design.css", "w") as css_source:
		css_source.write(compile_sass(string=scss_source.read()))

with open('data.json', 'r') as data_source:
	data = load_json(data_source)

with open('template.html', 'r') as template_source:
	template = template_source.read()

env = Environment(
	loader=DictLoader({'index.html': template}),
	trim_blocks=True,
	lstrip_blocks=True	
)

index_template = env.get_template("index.html")
with open("docs/index.html", "w") as html_source:
	rendered = soup(index_template.render(data=data), 'html.parser').prettify()
	html_source.write(re.sub(r'^(\s+)', lambda m: '\t' * len(m.group(1)), rendered, flags=re.MULTILINE))
