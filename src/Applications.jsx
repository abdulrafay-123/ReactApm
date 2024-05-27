import React, { useState, useEffect } from 'react';
import { FaDatabase,FaMap, FaNetworkWired, FaBell, FaBrain, FaChartLine, FaCog, FaCloud } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LineChart from './LineChart';
import BarChart from './BarChart';
import './Applications.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Applications.css';

const Applications = () => {
    
    const [processedLatencyData, setProcessedLatencyData] = useState([]);
    const [processedThroughputData, setProcessedThroughputData] = useState([]);
    const [latencyChartType, setLatencyChartType] = useState('line'); // State for latency chart type
    const [throughputChartType, setThroughputChartType] = useState('line');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCustomRange, setShowCustomRange] = useState(false);
    // Placeholder for your actual latency and throughput JSON data
    const latencyData = '{"Latency":{"1712035922614":0.694,"1712035942613":0.777,"1712035962612":0.747,"1712035982610":0.735,"1712036002610":0.742,"1712036022608":0.722,"1712036042608":0.683,"1712036062607":0.667,"1712036082606":2.017,"1712036102607":0.84,"1712036122605":0.676,"1712036142605":0.706,"1712036162605":0.701,"1712036182604":0.821,"1712036202604":0.85,"1712036222603":0.681,"1712036222610":367.813,"1712036242601":0.701,"1712036262601":0.676,"1712036282603":0.668,"1712036302601":0.675,"1712036322600":0.763,"1712036342599":0.66,"1712036362599":0.727,"1712036382598":0.727,"1712036402597":0.603,"1712036422605":0.954,"1712036442596":0.796,"1712036462596":0.72,"1712036482595":0.812,"1712036502595":2.527,"1712036522595":0.772,"1712036542594":0.768,"1712036542606":561.199,"1712036562593":0.817,"1712036582592":0.681,"1712036602591":0.698,"1712036622591":0.661,"1712036642592":0.842,"1712036662590":0.739,"1712036682589":0.741,"1712036702590":0.737,"1712036722590":0.744,"1712036742588":0.698,"1712036762587":0.672,"1712036782587":0.746,"1712036802586":0.84,"1712036822586":0.9,"1712036842591":0.637,"1712036862597":0.959,"1712036862605":1236.944,"1712036882596":0.877,"1712036902601":0.799,"1712036922605":1.769,"1712036942606":0.884,"1712036962608":0.778,"1712036982612":0.821,"1712037002614":0.708,"1712037022616":0.712,"1712037042619":0.682,"1712037062619":0.719,"1712037082620":0.779,"1712037102623":0.71,"1712037122622":0.713,"1712037142625":0.72,"1712037162627":0.673,"1712037162633":682.206,"1712037182625":0.713,"1712037202627":0.629,"1712037222628":0.725,"1712037242630":0.798,"1712037262630":0.728,"1712037282631":0.679,"1712037302632":0.721,"1712037322633":0.583,"1712037342633":1.599,"1712037362634":0.627,"1712037382633":0.782,"1712037402633":0.668,"1712037422636":0.72,"1712037442635":0.734,"1712037462634":0.781,"1712037462641":1174.664,"1712037482635":0.947,"1712037502634":0.726,"1712037522635":0.825,"1712037542636":0.8,"1712037562635":0.752,"1712037582636":0.808,"1712037602636":0.72,"1712037622639":0.907,"1712037642637":0.803,"1712037662636":0.857,"1712037682637":0.737,"1712037702639":0.65,"1712037722638":0.698,"1712037742637":0.883,"1712037762637":2.093,"1712037762646":832.641,"1712037782638":0.763,"1712037802639":0.677,"1712037822638":0.687,"1712037842638":0.679,"1712037862639":0.773,"1712037882637":0.718,"1712037902637":0.779,"1712037922637":0.726,"1712037942638":0.82,"1712037962638":0.65,"1712037982637":0.828,"1712038002637":0.664,"1712038022637":0.76,"1712038042637":0.649,"1712038062636":0.762,"1712038082636":0.713,"1712038082649":642.591,"1712038102638":0.837,"1712038122637":0.789,"1712038142636":0.612,"1712038162636":0.759,"1712038182636":1.735,"1712038202636":0.729,"1712038222637":0.931,"1712038242636":0.724,"1712038262636":0.7,"1712038282638":0.741,"1712038302637":0.707,"1712038322639":0.672,"1712038342635":0.681,"1712038362636":0.745,"1712038382636":0.875,"1712038382643":644.614,"1712038402635":0.758,"1712038422635":0.861,"1712038442635":0.785,"1712038462636":0.732,"1712038482636":0.7,"1712038502635":0.692,"1712038522635":0.901,"1712038542635":0.687,"1712038562635":0.863,"1712038582635":0.83,"1712038602635":2.154,"1712038622636":0.841,"1712038642634":0.812,"1712038662634":0.743,"1712038682635":0.749,"1712038702635":0.706,"1712038702642":320.696,"1712038722635":0.771,"1712038742635":0.95,"1712038762635":0.804,"1712038782637":0.656,"1712038802635":0.872,"1712038822637":0.795,"1712038842636":0.75,"1712038862635":0.791,"1712038882635":0.672,"1712038902634":0.786,"1712038922635":0.854,"1712038942635":0.676,"1712038982634":0.814,"1712038962634":0.71,"1712039002634":0.796,"1712039022636":1.524,"1712039022643":323.315,"1712039042634":0.827,"1712039062637":0.706,"1712039082635":0.623,"1712039102635":0.814,"1712039122634":0.775,"1712039142635":0.754,"1712039162634":0.723,"1712039182634":0.681,"1712039202635":0.725,"1712039222634":0.908,"1712039242634":0.78,"1712039262636":0.865,"1712039282635":0.597,"1712039302634":0.939,"1712039322633":0.64,"1712039342634":0.882,"1712039342641":380.516,"1712039362634":0.746,"1712039382634":0.735,"1712039402633":0.762,"1712039422633":0.779,"1712039442636":1.453,"1712039462635":0.793,"1712039482633":0.703,"1712039502633":0.804,"1712039522634":0.741,"1712039542634":0.684,"1712039562633":0.686,"1712039582633":0.739,"1712039602633":0.682,"1712039622633":0.812,"1712039642633":0.888,"1712039662633":0.567,"1712039662639":395.625,"1712039682633":0.814,"1712039702633":0.756,"1712039722633":0.944,"1712039742633":0.637,"1712039762633":0.833,"1712039782633":0.684,"1712039802633":0.812,"1712039822633":0.752,"1712039842634":0.858,"1712039862633":1.727,"1712039882633":0.73,"1712039902636":0.711,"1712039922644":0.727,"1712039942644":0.75,"1712039962651":0.997,"1712039962658":414.41,"1712039982659":0.717,"1712040002659":0.887,"1712040012666":0.679,"1712040032666":0.703,"1712040042673":0.707,"1712040062674":0.759,"1712040082680":0.869,"1712040102686":0.932,"1712040122686":0.697,"1712040142691":0.685,"1712040162696":0.684,"1712040182697":0.774,"1712040202702":0.749,"1712040222707":0.892,"1712040242708":0.695,"1712040262714":1.89,"1712040262722":358.395,"1712040282717":0.883,"1712040302717":0.758,"1712040322721":0.768,"1712040342725":0.699,"1712040362725":0.884,"1712040382729":0.73,"1712040402733":0.714,"1712040422733":0.655,"1712040442737":0.736,"1712040462739":0.72,"1712040482741":0.887,"1712040502744":0.791,"1712040522747":0.79,"1712040542747":0.778,"1712040562751":0.771,"1712040562757":367.467,"1712040582754":0.833,"1712040602753":0.873,"1712040622757":0.74,"1712040642759":0.723,"1712040662758":0.755,"1712040682761":1.876,"1712040702764":0.771,"1712040722763":0.787,"1712040742767":0.806,"1712040762768":0.745,"1712040782768":0.769,"1712040802770":0.734,"1712040822772":0.702,"1712040842773":0.726,"1712040862776":0.683,"1712040862782":367.666,"1712040882779":0.685,"1712040902777":0.808,"1712040922779":0.749,"1712040942782":0.689,"1712040962782":0.744,"1712040982783":0.669,"1712041002784":0.702,"1712041022784":0.683,"1712041042787":0.711,"1712041062789":0.687,"1712041082788":0.742,"1712041102789":1.751,"1712041122791":0.737,"1712041142791":0.736,"1712041162793":0.65,"1712041162805":377.878,"1712041182795":0.786,"1712041202796":0.585,"1712041222795":0.682,"1712041242798":0.737,"1712041262797":0.773,"1712041282799":0.728,"1712041302801":0.681,"1712041322800":0.684,"1712041342802":0.83,"1712041362803":0.775,"1712041382803":0.809,"1712041402805":0.717,"1712041422806":0.804,"1712041442807":0.796,"1712041462807":0.642,"1712041462814":364.756,"1712041482809":0.68,"1712041502809":0.617,"1712041522809":1.955,"1712041542811":0.823,"1712041562815":0.826,"1712041582814":0.839,"1712041602813":0.741,"1712041622814":0.74,"1712041642814":0.715,"1712041662815":0.812,"1712041682816":0.811,"1712041702817":0.78,"1712041722818":0.71,"1712041742818":0.717,"1712041762820":0.783,"1712041762827":370.817,"1712041782821":0.755,"1712041802820":0.699,"1712041822823":0.764,"1712041842822":0.685,"1712041862822":0.804,"1712041882823":0.942,"1712041902825":0.731,"1712041922825":0.703,"1712041942825":1.92,"1712041962823":0.794,"1712041982823":0.595,"1712042002820":0.683,"1712042022818":0.658,"1712042042818":0.775,"1712042062815":0.685,"1712042082814":0.765,"1712042082821":365.921,"1712042102813":0.768,"1712042122811":0.763,"1712042142808":0.817,"1712042162809":0.762,"1712042182809":0.71,"1712042202806":0.804,"1712042222806":0.765,"1712042242804":0.938,"1712042262805":0.708,"1712042282803":0.735,"1712042302801":0.791,"1712042322800":0.927,"1712042342802":0.698,"1712042362801":1.723,"1712042382798":0.968,"1712042402798":0.78,"1712042402806":357.106,"1712042422797":0.666,"1712042442797":0.839,"1712042462797":0.767,"1712042482797":0.711,"1712042502796":0.828,"1712042522795":0.694,"1712042542799":0.766,"1712042562794":0.772,"1712042582793":0.738,"1712042602796":0.875,"1712042622794":0.699,"1712042642794":0.738,"1712042662793":0.702,"1712042682793":0.672,"1712042702792":0.884,"1712042722792":0.805,"1712042722799":365.188,"1712042742793":0.603,"1712042762792":0.715,"1712042782791":1.8,"1712042802793":0.773,"1712042822792":0.787,"1712042842790":0.782,"1712042862791":0.745,"1712042882791":0.733,"1712042902791":0.762,"1712042922791":0.826,"1712042942792":0.911,"1712042962792":1.042,"1712042982793":0.834,"1712043002793":0.613,"1712043022791":0.714,"1712043042792":0.729,"1712043042798":367.927,"1712043062791":0.717,"1712043082796":0.62,"1712043102791":0.749,"1712043122791":1.012,"1712043142791":0.783,"1712043162791":0.71,"1712043182791":0.79,"1712043202791":1.872,"1712043222792":0.761,"1712043242793":0.727,"1712043262792":0.755,"1712043282793":0.72,"1712043302793":0.744,"1712043322793":0.688,"1712043342793":0.735,"1712043342799":370.456,"1712043362796":0.762,"1712043382794":0.694,"1712043402794":0.726,"1712043422794":0.897,"1712043442794":0.682,"1712043462793":0.629,"1712043482794":0.745,"1712043502794":0.768,"1712043522798":0.68,"1712043542795":0.721,"1712043562797":0.726,"1712043582795":0.672,"1712043602795":0.777,"1712043622796":1.979,"1712043642795":0.729,"1712043642802":383.929,"1712043662797":0.685,"1712043682796":0.727,"1712043702797":0.809,"1712043722797":0.756,"1712043742798":0.725,"1712043762797":0.755,"1712043782797":0.7,"1712043802798":0.642,"1712043822798":0.822,"1712043842799":0.69,"1712043862798":0.781,"1712043882799":0.775,"1712043902799":0.695,"1712043922800":0.695,"1712043942800":0.65,"1712043942806":380.282,"1712043962802":0.744,"1712043982801":0.782,"1712044002801":0.711,"1712044022804":0.714,"1712044042809":2.161,"1712044062808":0.676,"1712044082813":0.836,"1712044102816":0.854,"1712044122815":0.722,"1712044142820":0.72,"1712044162823":0.748,"1712044182822":0.727,"1712044202826":0.848,"1712044222829":0.681,"1712044242829":0.677,"1712044242836":372.786,"1712044262834":0.715,"1712044282835":0.733,"1712044302836":0.731,"1712044322836":0.861,"1712044342839":0.796,"1712044362839":0.779,"1712044382842":0.86,"1712044402846":0.66,"1712044422845":0.763,"1712044442846":0.753,"1712044462849":2.029,"1712044482850":0.711,"1712044502852":0.698,"1712044522854":0.884,"1712044542854":0.681,"1712044542861":369.962,"1712044562856":0.724,"1712044582858":0.642,"1712044602858":0.715,"1712044622859":0.727,"1712044642860":0.758,"1712044662862":0.804,"1712044682862":0.694,"1712044702864":0.775,"1712044722865":0.697,"1712044742867":0.732,"1712044762868":0.808,"1712044782868":0.718,"1712044802869":0.739,"1712044822870":0.736,"1712044842871":0.653,"1712044842878":384.717,"1712044862873":0.805,"1712044882874":2.118,"1712044902873":0.872,"1712044922875":0.792,"1712044942877":0.659,"1712044962878":0.719,"1712044982878":0.733,"1712045002879":0.765,"1712045022879":0.843,"1712045042881":0.709,"1712045062882":0.657,"1712045082882":0.712,"1712045102884":0.755,"1712045122884":0.699,"1712045142884":0.598,"1712045142890":405.701,"1712045162887":0.657,"1712045182888":0.758,"1712045202887":0.759,"1712045222888":0.714,"1712045242890":0.761,"1712045262890":0.725,"1712045282891":0.743,"1712045302891":1.804,"1712045322892":0.881,"1712045342893":0.782,"1712045362893":0.618,"1712045382895":0.835,"1712045402896":0.714,"1712045422896":0.764,"1712045442896":0.709,"1712045442903":368.514,"1712045462897":0.76,"1712045482898":0.77,"1712045502898":0.746,"1712045522899":0.863,"1712045542901":0.727,"1712045562900":0.844,"1712045582902":0.841,"1712045602902":0.717,"1712045622902":0.796,"1712045642904":0.686,"1712045662904":0.744,"1712045682905":0.784,"1712045702906":0.79,"1712045762909":0.689,"1712045722908":1.849,"1712045742906":0.626,"1712045742912":379.195,"1712045782909":0.641,"1712045802908":0.833,"1712045822909":0.753,"1712045842911":0.749,"1712045862912":0.714,"1712045882912":0.717,"1712045902913":0.788,"1712045922914":0.699,"1712045942913":0.758,"1712045962914":0.747,"1712045982919":0.809,"1712046002915":0.761,"1712046022917":0.695,"1712046042917":0.711,"1712046042923":376.952,"1712046062918":0.655,"1712046082919":0.685,"1712046102919":0.764,"1712046122919":0.692,"1712046142921":1.664,"1712046162921":0.773,"1712046182924":0.684,"1712046202923":0.746,"1712046222922":0.881,"1712046242924":0.862,"1712046262928":0.849,"1712046282926":0.775,"1712046302926":0.653,"1712046322925":0.89,"1712046342925":0.777,"1712046342933":674.235,"1712046362926":0.712,"1712046382927":0.72,"1712046402926":0.71,"1712046422927":0.981,"1712046442932":0.726,"1712046462929":0.713,"1712046482930":0.744,"1712046502930":0.663,"1712046522930":0.711,"1712046542933":0.782,"1712046562933":1.975,"1712046582933":0.601,"1712046602933":0.713,"1712046622935":0.738,"1712046642933":0.852,"1712046642940":375.182,"1712046662935":0.732,"1712046682936":0.692,"1712046702935":0.799,"1712046722937":0.664,"1712046742938":0.67,"1712046762938":0.644,"1712046782937":0.87,"1712046802938":0.804,"1712046822939":0.788,"1712046842940":0.703,"1712046862941":0.781,"1712046882941":0.787,"1712046902943":0.785,"1712046922943":0.826,"1712046942942":0.701,"1712046942954":371.582,"1712046962944":0.766,"1712046982944":1.741,"1712047002945":0.683,"1712047022944":0.69,"1712047042946":0.791,"1712047062947":0.81,"1712047082946":0.782,"1712047102947":0.86,"1712047122948":0.745,"1712047142948":0.737,"1712047162950":0.859,"1712047182949":0.697,"1712047202951":0.746,"1712047222954":1.114,"1712047242952":0.613,"1712047242959":428.188,"1712047262952":0.699,"1712047282954":0.858,"1712047302953":0.762,"1712047322954":0.821,"1712047342955":0.748,"1712047362954":0.709,"1712047382956":0.778,"1712047402957":1.868,"1712047422960":0.667,"1712047442958":0.806,"1712047462959":0.753,"1712047482958":0.798,"1712047502959":0.948,"1712047522961":0.671,"1712047542959":0.68,"1712047542966":443.087,"1712047562961":0.879,"1712047582961":0.764,"1712047602962":0.717,"1712047622962":0.693,"1712047642965":0.718,"1712047662964":0.75,"1712047682967":0.834,"1712047702966":0.764,"1712047722966":0.727,"1712047742967":0.698,"1712047762968":0.738,"1712047782967":0.763,"1712047802968":0.943,"1712047822971":2.232,"1712047842978":0.801,"1712047842986":358.836,"1712047862973":0.776,"1712047882971":0.652,"1712047902971":0.718,"1712047922973":0.919,"1712047942973":0.791,"1712047962973":0.794,"1712047982974":0.923,"1712048002977":0.766,"1712048022975":0.714,"1712048042976":0.687,"1712048062977":0.848,"1712048082976":0.802,"1712048102976":0.718,"1712048122977":0.838,"1712048142978":0.568,"1712048162979":0.837,"1712048162986":372.195,"1712048182978":0.711,"1712048202977":0.738,"1712048222979":0.693,"1712048242979":1.866,"1712048262982":0.779,"1712048282979":0.777,"1712048302979":0.739,"1712048322980":0.819,"1712048342981":0.654,"1712048362979":0.662,"1712048382980":0.686,"1712048402980":0.609,"1712048422981":0.783,"1712048442981":0.714,"1712048462981":0.763,"1712048462988":382.404,"1712048482982":0.776,"1712048502983":0.744,"1712048522983":0.802,"1712048542983":0.717,"1712048562983":0.718,"1712048582984":0.666,"1712048602984":0.78,"1712048622985":0.657,"1712048642985":0.772,"1712048662985":2.378,"1712048682985":0.75,"1712048702986":0.797,"1712048722986":0.858,"1712048742987":0.648,"1712048762988":0.673,"1712048762994":374.462,"1712048782988":0.72,"1712048802987":0.685,"1712048822989":0.747,"1712048842989":0.808,"1712048862989":0.64,"1712048882990":0.724,"1712048902990":0.803,"1712048922990":0.68,"1712048942992":0.733,"1712048962992":0.816,"1712048982992":0.688,"1712049002993":0.678,"1712049022993":0.758,"1712049042993":0.755,"1712049062995":0.855,"1712049063002":374.053,"1712049082995":1.995,"1712049102994":0.805,"1712049122996":0.722,"1712049142996":0.778,"1712049162996":0.74,"1712049182997":0.752,"1712049202997":0.678,"1712049222998":0.746}}'; 
const throughputData = '{"Throughput":{"1712035800000":7.784,"1712036100000":378.685,"1712036400000":574.33,"1712036700000":1249.805,"1712037000000":692.894,"1712037300000":1186.737,"1712037600000":845.286,"1712037900000":654.674,"1712038200000":655.955,"1712038500000":333.855,"1712038800000":335.511,"1712039100000":392.08,"1712039400000":407.532,"1712039700000":427.045,"1712040000000":371.88,"1712040300000":378.981,"1712040600000":380.041,"1712040900000":389.722,"1712041200000":375.679,"1712041500000":383.441,"1712041800000":378.124,"1712042100000":12.877,"1712042400000":368.353,"1712042700000":378.19,"1712043000000":380.199,"1712043300000":381.325,"1712043600000":396.281,"1712043900000":392.717,"1712044200000":385.383,"1712044500000":381.019,"1712044800000":397.229,"1712045100000":417.79,"1712045400000":379.979,"1712045700000":391.357,"1712046000000":389.149,"1712046300000":686.593,"1712046600000":386.419,"1712046900000":384.055,"1712047200000":440.928,"1712047500000":454.431,"1712047800000":372.202,"1712048100000":384.28,"1712048400000":395.033,"1712048700000":385.482,"1712049000000":384.315}}';


const applicationsData = [
    { name: "Microservices Demo", type: "java" },
    { name: "Python Demo", type: "python" }
];
const servicesData = [
    { name: "customers-service", type: "java" },
    { name: "discovery-service", type: "java" },
    { name: "api-gateway-service", type: "java" },
    { name: "visits-service", type: "java" },
    { name: "vets-service", type: "java" }
];
const hostsData = [
    { name: "host1", ip: "10.15.14.1" },
    { name: "host2", ip: "10.15.14.2" },
    { name: "host3", ip: "10.15.14.3" },
    { name: "host4", ip: "10.15.14.4" },
    { name: "host5", ip: "10.15.14.5" }
];
const databasesData = [
    { name: "petclinic1", type: "mysql", ip: "10.15.14.1" },
    { name: "petclinic2", type: "postgres", ip: "10.15.14.2" }
];

const renderTable = (data, headers) => (
    <table className="data-table">
        <thead>
            <tr>
                {headers.map((header, index) => <th key={index}>{header}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {headers.map((header, headerIndex) => (
                        <td key={headerIndex}>{item[header.toLowerCase()] || index + 1}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>



    




);
    

const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    setShowCustomRange(false);
};

const handleCustomRange = () => {
    setShowCustomRange(true);
};

const setPredefinedRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start);
    setEndDate(end);
};


    useEffect(() => {
        const parsedLatency = JSON.parse(latencyData).Latency;
        const latencyArray = Object.entries(parsedLatency).map(([key, value]) => ({
            date: new Date(parseInt(key)),
            value
        }));
        setProcessedLatencyData(latencyArray);

        const parsedThroughput = JSON.parse(throughputData).Throughput;
        const throughputArray = Object.entries(parsedThroughput).map(([key, value]) => ({
            date: new Date(parseInt(key)),
            value
        }));
        setProcessedThroughputData(throughputArray);
    }, []);

    
    


    return (
        <div className="Applications-container app-container">
            <header className="dashboard-header">
            <h1 onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
                <img 
                    src={`${process.env.PUBLIC_URL}/logo.png`} 
                    alt="logo" 
                    style={{ height: '30px' }}  // Adjust the height as needed
                />
            </h1>
                <div className='time-picker'>
                    <button className='time-picker-button' onClick={toggleDatePicker}>Date Picker</button>
                    {showDatePicker && (
                        <div className="date-picker-modal">
                            {showCustomRange ? (
                                <div className="custom-date-range">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        showTimeSelect
                                        dateFormat="Pp"
                                    />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        showTimeSelect
                                        dateFormat="Pp"
                                    />
                                    <button onClick={toggleDatePicker}>Close</button>
                                </div>
                            ) : (
                                <div className="predefined-ranges">
                                    <ul>
                                        <li onClick={() => { setPredefinedRange(1); setShowDatePicker(false); }}>Previous 1 Day</li>
                                        <li onClick={() => { setPredefinedRange(7); setShowDatePicker(false); }}>Previous 1 Week</li>
                                        <li onClick={() => { setPredefinedRange(14); setShowDatePicker(false); }}>Previous 2 Weeks</li>
                                        <li onClick={handleCustomRange}>Custom Time Range</li>
                                    </ul>
                                    <button onClick={toggleDatePicker}>Close</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>
            <div className="dashboard">
                <aside className="dashboard-aside">
                    <Link to="/applications" className="icon-item">
                        <FaDatabase />
                        <span>Applications</span>
                    </Link>
                    <Link to="/ServiceMap" className="icon-item">
              <FaMap />
              <span>Service Map</span>
              </Link>
                    <Link to="/infrastructure" className="icon-item">
                        <FaNetworkWired />
                        <span>Infrastructure</span>
                    </Link>
                    <Link to="/AlertsAndAlarms" className="icon-item">
                        <FaBell />
                        <span>Alerts & Alarms</span>
                    </Link>
                    <Link to="/AIInsights" className="icon-item">
                        <FaBrain />
                        <span>AI Insights</span>
                    </Link>
                    <Link to="/reports" className="icon-item">
                        <FaChartLine />
                        <span>Reports</span>
                    </Link>
                    <Link to="/genai" className="icon-item">
                        <FaCog />
                        <span>Gen AI</span>
                    </Link>
                    <Link to="/Configuration" className="icon-item">
                        <FaCloud />
                        <span>Configuration</span>
                    </Link>
                </aside>
                <main className="dashboard-main">
                    <h2>Applications and Services</h2>
                    <div className="content-grid">
                        <div className="content-box">
                            <h3>Applications ({applicationsData.length})</h3>
                            {renderTable(applicationsData, ['S.No', 'Name', 'Type'])}
                        </div>
                        <div className="content-box">
                            <h3>Services ({servicesData.length})</h3>
                            {renderTable(servicesData, ['S.No', 'Name', 'Type'])}
                        </div>
                        <div className="content-box">
                            <h3>Hosts ({hostsData.length})</h3>
                            {renderTable(hostsData, ['S.No', 'Name', 'IP'])}
                        </div>
                        <div className="content-box">
                            <h3>Databases ({databasesData.length})</h3>
                            {renderTable(databasesData, ['S.No', 'Name', 'Type', 'IP'])}
                        </div>
                    </div>
                    <div className="chart-section">
                    <div className="graphs1">
                    <div className="graph">
                            <h3>Application Latency</h3>
                            <div className="chart-type-selector">
                                <label>
                                    <input
                                        type="radio"
                                        value="line"
                                        checked={latencyChartType === 'line'}
                                        onChange={() => setLatencyChartType('line')}
                                    />
                                    Line Chart
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="bar"
                                        checked={latencyChartType === 'bar'}
                                        onChange={() => setLatencyChartType('bar')}
                                    />
                                    Bar Chart
                                </label>
                            </div>
                            {latencyChartType === 'line' ?
                                <LineChart data={processedLatencyData} chartId="latencyChart" isOnApplicationsPage={true} /> :
                                <BarChart data={processedLatencyData} chartId="latencyChart" isLatencyChart={true} isOnApplicationsPage={true} />
                            }
                        </div>
                        <div className="graph">
                            <h3>Application Throughput</h3>
                            <div className="chart-type-selector">
                                <label>
                                    <input
                                        type="radio"
                                        value="line"
                                        checked={throughputChartType === 'line'}
                                        onChange={() => setThroughputChartType('line')}
                                    />
                                    Line Chart
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="bar"
                                        checked={throughputChartType === 'bar'}
                                        onChange={() => setThroughputChartType('bar')}
                                    />
                                    Bar Chart
                                </label>
                            </div>
                            {throughputChartType === 'line' ?
                                <LineChart data={processedThroughputData} chartId="throughputChart" isOnApplicationsPage={true}/> :
                                <BarChart data={processedThroughputData} chartId="throughputChart" isLatencyChart={false} isOnApplicationsPage={true}/>
                            }
                        </div>
                            <div className="graph" >
                                <h3>Errors</h3>
                                <BarChart data={processedThroughputData} chartId="errorsChart" isLatencyChart={false} isOnApplicationsPage={true}/>
                            </div>
            </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Applications;