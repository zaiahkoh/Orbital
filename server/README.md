Route 1: http://localhost:3000/rules/<rule_tag> (GET request)

e.g. http://localhost:3000/rules/r_cs_cp_ifs

{"_id":"5ed0d9a9a9225a12882ec26d","name":"University Level Requirements","desc":"Complete at least 20MCs worth of General Education Modules, with at least 1 module in each of the GEH, GEQ, GER, GES and GET pillars","tag":"r_ulr","sub":[{"_id":"5ed0dd49a9225a12882ec26e","name":"GEH Pillar","desc":"Complete a GEH-coded module","tag":"r_geh_pillar"},{"_id":"5ed0dd54a9225a12882ec26f","name":"GEQ Pillar","desc":"Complete a GEQ-coded module","tag":"r_geq_pillar"},{"_id":"5ed0dd60a9225a12882ec270","name":"GER Pillar","desc":"Complete a GER-coded module","tag":"r_ger_pillar"},{"_id":"5ed0dd6ca9225a12882ec271","name":"GES Pillar","desc":"Complete a GES-coded module","tag":"r_ges_pillar"},{"_id":"5ed0dd76a9225a12882ec272","name":"GET Pillar","desc":"Complete a GET-coded module","tag":"r_get_pillar"}]}

Route 2: http://localhost:3000/eval/<rule_tag> (POST request)

e.g.

POST
{
modules: ["GET1028", "GEH1024"]
}

RESPONSE:
{false}
