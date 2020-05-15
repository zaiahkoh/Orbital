//1. list of faculty in array form example:

const faculties = ['Arts and Social Sciences', 'Business', 
                  'Computing', 'Dentistry',
                  'Design & Environment', 'Engineering',
                  'Law', 'Medicine', 'Music','Science' ];

//2. list of majors for each faculty in array form 
// refer to Options.js in Components folder, I typed in all of it alr 
// for FASS u can either give me segmented one or full list (refer to Options.js)

const computing = ['Business Analytics', 'Computer Engineering', 
                  'Computer Science', 'Information Security',
                  'Information Systems'];

//3. list of Specialisation for each major that has specialisation in array form
// try to format it in {majorname}Specialisation

const computerScienceSpecialisation = ['a', 'b'];

//4. list of Residential College in array form
const residence = ['CAPT', 'RC4', 'RVRC','Tembusu', 'USP'];

//5. a link to process all the inputs which will return the suggested module plan 
//for create module plan button 

//link should return:

//6. TENTATIVE if residence === N/A return an array of GEMs in this format
const GEMs = ['GER: Quantitative Reasoning', 'GEH: Humanities',...];

//TENTATIVE extension for each GEM: return an array, whose members are OBJECTS
//whose props value are an array of OBJECTS with 2 props, id and value
const gemMods = [
                    {GEH: [{id: GEH1001, value: 'GEH1000: Globalisation and New Media'},
                          {id: GEH 1002, value: 'GEH 1002: lallalalal'},
                          {id: GEH 23420, value: 'GEH 2304023: lafjkljwe'}]}, //end of first object member
                    
                    {GES: {id: GES324230, value: 'GES234230: adkfjkjfklasj'}} //end of object 2
                    ]; //end of array


//else if UTCP (Tembu, CAPT and RC4) return array of UTCP mods
const UTCP = ['Junior Sem..', 'Senior Seminar: Singapore Studies',
'Senior Seminar: GEM', IEM 1, IEM 2]

//for extension for each UTCP mods, follow the format of GEM (take note that diff RCs have diff JS and SS
//but usually same IEM)

//else if RVRC return array of whatever RV is doing, extension same as above

//else if USP returen array of whatever USP is doing, extension same as above

//




