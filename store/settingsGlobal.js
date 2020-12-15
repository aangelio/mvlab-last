import de from "element-ui/src/locale/lang/de";

export default {
    namespaced: true,

    state: () => ({
        clientsObject: null,

        typeStructured: [],
        typeStructuredTable: [
            {
                id: 1,
                key: 'reserves1',
                table: {
                    name: 'Название Резерв1',
                },
            },
            {
                id: 2,
                key: 'reserves2',
                table: {
                    name: 'Название Резерв',
                    reserve1: 'Название Резерв2',
                },
            },
            {
                id: 3,
                key: 'organisations',
                table: {
                    name: 'Название Органищацмм',
                },
            },
            {
                id: 4,
                key: 'companies',
                table: {
                    name: 'Название Предприятие',
                    reserve1: 'Название резерв1',
                    reserve2: 'Название резерв2',
                    organisation: 'Название организации',
                },
            },
            {
                id: 5,
                key: 'factories',
                table: {
                    name: 'Название Завод',
                    map: 'Местоположение',
                },
            },
            {
                id: 6,
                key: 'workshops',
                table: {
                    name: 'Название Цех',
                    factory: 'Название Завода',
                    smena: 'Смены',
                    break: 'Перерывы',
                },
            },
            {
                id: 7,
                key: 'knots',
                table: {
                    name: 'Название Узел',
                    workshop: 'Название цеха',
                    factory: 'Название завода',
                },
            },
            {
                id: 8,
                key: 'sensors',
                table: {
                    name: 'Название Датчик',
                    shema: 'Обозначение на схеме',
                    knot: 'Название узла',
                    workshop: 'Название цеха',
                    factory: 'Название завода',
                },
            },
            {
                id: 9,
                key: 'variables',
                table: {
                    name: 'Имя переменной',
                    connectOut: 'Соединение',
                    limits: 'Пределы',
                    sensor: 'Название датчика',
                    knot: 'Название узла',
                    workshop: 'Название цеха',
                    factory: 'Название завода',
                },
            },
        ],
        reserves1: [],
        reserves2: [],
        organisations: [],
        companies: [],
        factories: [],
        workshops: [],
        knots: [],
        sensors: [],
        variables: [],
    }),
    getters: {
        typeStructuredTable(state) {
            return state.typeStructuredTable;
        },
        clientsObject(state) {
            let clientsObject = state.clientsObject;
            if (!clientsObject)
                clientsObject = JSON.parse(localStorage.getItem('clientsObject'));

            if (!(clientsObject && state.typeStructured.length))
                return state.clientsObject;

            let newObj = JSON.parse(JSON.stringify(clientsObject));
            let newArr = [];
            clientsObject.currentStructureObject.forEach((id) => {
                try {
                    newArr.push(state.typeStructured.filter((item) => item.id === id)[0]);
                } catch (e) {
                    debugger
                }
            });

            newArr.push({
                id: 9,
                value: 'Переменные'
            });

            newObj.currentStructureObject = newArr;
            return newObj;
        },

        typeStructured(state) {
            let array = [];
            array.push({
                id: 0,
                text: "Выбор типа узла",
                value: "",
                disabled: true,
            });

            state.typeStructured.forEach((item) => {
                array.push({
                    id: item.id,
                    text: item.value,
                    value: item.value,
                    disabled: false,
                });
            });

            return array;
        },
        reserves1(state) {
            let reserves1 = state.reserves1;
            if (localStorage.getItem('reserves1'))
                reserves1 = JSON.parse(localStorage.getItem('reserves1'));

            return reserves1;
        },
        reserves2(state, getters) {
            let reserves2 = JSON.parse(JSON.stringify(state.reserves2));
            if (localStorage.getItem('reserves2'))
                reserves2 = JSON.parse(localStorage.getItem('reserves2'));

            return reserves2.map(item => {
                item.reserve1 = getters.reserves1.filter(i => i.id === item.reserv1_id)[0].name;
                return item;
            })
        },
        organisations(state, getters) {
            let organisations = JSON.parse(JSON.stringify(state.organisations));
            if (localStorage.getItem('organisations'))
                organisations = JSON.parse(localStorage.getItem('organisations'));

            return organisations.map(item => {
                item.reserve1 = getters.reserves1.filter(i => i.id === item.reserv1_id)[0].name;
                item.reserve2 = getters.reserves2.filter(i => i.id === item.reserv2_id)[0].name;
                return item;
            })
        },
        companies(state, getters) {
            let companies = JSON.parse(JSON.stringify(state.companies));
            if (localStorage.getItem('companies'))
                companies = JSON.parse(localStorage.getItem('companies'));

            return companies.map(item => {
                item.reserve1 = getters.reserves1.filter(i => i.id === item.reserv1_id)[0].name;
                item.reserve2 = getters.reserves2.filter(i => i.id === item.reserv2_id)[0].name;
                item.organisation = getters.organisations.filter(i => i.id === item.organisation_id)[0].name;
                return item;
            })
        },
        factories(state, getters) {
            let factories = JSON.parse(JSON.stringify(state.factories));
            if (localStorage.getItem('factories'))
                factories = JSON.parse(localStorage.getItem('factories'));

            return factories.map(item => {
                item.reserve1 = getters.reserves1.filter(i => i.id === item.reserv1_id)[0].name;
                item.reserve2 = getters.reserves2.filter(i => i.id === item.reserv2_id)[0].name;
                item.organisation = getters.organisations.filter(i => i.id === item.organisation_id)[0].name;
                item.company = getters.companies.filter(i => i.id === item.company_id)[0].name;
                return item;
            })
        },
        workshops(state, getters) {
            let workshops = state.workshops;
            if (localStorage.getItem('workshops'))
                workshops = JSON.parse(localStorage.getItem('workshops'));

            let newObj = JSON.parse(JSON.stringify(workshops));
            let factories = JSON.parse(JSON.stringify(getters.factories));
            newObj.map((item) => {
                let breaks = [];
                let smenas = [];
                item.ranges.filter(item => item.is_active).forEach(el => {
                    smenas.push((el.start + '-' + el.end).replace(':', '.'));
                    el.breaks.filter(e => e.is_active).forEach(b => breaks.push((b.start + '-' + b.end).replace(':', '.')));
                });

                item.factory = factories.filter(i => i.id === item.factory_id)[0].name;
                item.smena = smenas.join(';');
                item.break = breaks.join(';');

                return item;
            });

            return newObj;
        },
        knots(state, getters) {
            let knots = JSON.parse(JSON.stringify(state.knots));
            if (localStorage.getItem('knots'))
                knots = JSON.parse(localStorage.getItem('knots'));

            return knots.map(item => {
                let factories = getters.factories.filter(i => i.id === item.factory_id);
                let workshops = getters.workshops.filter(i => i.id === item.workshop_id);

                item.factory = factories.length ? factories[0].name : "";
                item.workshop = workshops.length ? workshops[0].name : "";

                return item;
            })
        },
        sensors(state, getters) {
            let sensors = JSON.parse(JSON.stringify(state.sensors));
            if (localStorage.getItem('sensors'))
                sensors = JSON.parse(localStorage.getItem('sensors'));

            return sensors.map(item => {
                let factories = getters.factories.filter(i => i.id === item.factory_id);
                let workshops = getters.workshops.filter(i => i.id === item.workshop_id);

                item.factory = factories.length ? factories[0].name : "";
                item.workshop = workshops.length ? workshops[0].name : "";

                return item;
            })
        },
        variables(state, getters) {
            let variables = JSON.parse(JSON.stringify(state.variables));
            if (localStorage.getItem('variables'))
                variables = JSON.parse(localStorage.getItem('variables'));

            return variables.map(item => {
                let sensors = getters.sensors.filter(i => i.id === item.sensor_id);
                let knots = getters.knots.filter(i => i.id === item.knot_id);
                let workshops = getters.workshops.filter(i => i.id === item.workshop_id);
                let factories = getters.factories.filter(i => i.id === item.factory_id);

                item.connectOut = item.connect.split(",").join("\n");
                item.limits = `Верхн.измерения = ${item.limitMaxWarn}\nНижн.измерения = ${item.limitMinWarn}МПа\nВерхн.аварийный = ${item.limitMaxСrash}МПа\nНижн.аварийный = ${item.limitMinСrash}МПа\nСкорость изм. = ${item.limitSpead}МПа`;

                item.sensor = knots.length ? sensors[0].name : "";
                item.knot = knots.length ? knots[0].name : "";
                item.workshop = workshops.length ? workshops[0].name : "";
                item.factory = factories.length ? factories[0].name : "";

                return item;
            })
        }
    },
    mutations: {
        setClientsObject(state, data) {
            state.clientsObject = data;
        },
        setTypeStructured(state, data) {
            state.typeStructured = data;
        },
        setTypeStructuredTable(state, option) {
            state.typeStructuredTable.filter((item => item.id === option.id))[0].data.rows.push(option.data);
        },
        setReserve1(state, option) {
            let reserves1 = JSON.parse(localStorage.getItem('reserves1'));
            if (option.id && reserves1.filter(item => item.id === option.id).length)
                for (let key in reserves1.filter(item => item.id === option.id)[0])
                    reserves1.filter(item => item.id === option.id)[0][key] = option[key];
            else
                reserves1.push(option);

            state.reserves1 = reserves1;
        },
        setReserve2(state, option) {
            let reserves2 = JSON.parse(localStorage.getItem('reserves2'));
            if (option.id && reserves2.filter(item => item.id === option.id).length)
                for (let key in reserves2.filter(item => item.id === option.id)[0])
                    reserves2.filter(item => item.id === option.id)[0][key] = option[key];
            else
                reserves2.push(option);

            state.reserves2 = reserves2;
        },
        setOrganisations(state, option) {
            let organisations = JSON.parse(localStorage.getItem('organisations'));
            if (option.id && organisations.filter(item => item.id === option.id).length)
                for (let key in organisations.filter(item => item.id === option.id)[0])
                    organisations.filter(item => item.id === option.id)[0][key] = option[key];
            else
                organisations.push(option);

            state.organisations = organisations;
        },
        setCompanies(state, option) {
            let companies = JSON.parse(localStorage.getItem('companies'));
            if (option.id && companies.filter(item => item.id === option.id).length)
                for (let key in companies.filter(item => item.id === option.id)[0])
                    companies.filter(item => item.id === option.id)[0][key] = option[key];
            else
                companies.push(option);

            state.companies = companies;
        },
        setFactories(state, option) {
            let factories = JSON.parse(localStorage.getItem('factories'));
            if (option.id && factories.filter(item => item.id === option.id).length)
                for (let key in factories.filter(item => item.id === option.id)[0])
                    factories.filter(item => item.id === option.id)[0][key] = option[key];
            else
                factories.push(option);

            state.factories = factories;
        },
        setKnots(state, option) {
            let knots = JSON.parse(localStorage.getItem('knots'));
            if (option.id && knots.filter(item => item.id === option.id).length)
                for (let key in knots.filter(item => item.id === option.id)[0])
                    knots.filter(item => item.id === option.id)[0][key] = option[key];
            else
                knots.push(option);

            state.knots = knots;
        },
        setWorkshop(state, option) {
            let workshops = JSON.parse(localStorage.getItem('workshops'));
            if (option.id && workshops.filter(item => item.id === option.id).length)
                for (let key in workshops.filter(item => item.id === option.id)[0])
                    workshops.filter(item => item.id === option.id)[0][key] = option[key];
            else
                workshops.push(option);

            state.workshops = workshops;
        },
        setSensors(state, option) {
            let sensors = JSON.parse(localStorage.getItem('sensors'));
            if (option.id && sensors.filter(item => item.id === option.id).length)
                for (let key in sensors.filter(item => item.id === option.id)[0])
                    sensors.filter(item => item.id === option.id)[0][key] = option[key];
            else
                sensors.push(option);

            state.sensors = sensors;
        },
        setVariables(state, option) {
            let variables = JSON.parse(localStorage.getItem('variables'));
            if (option.id && variables.filter(item => item.id === option.id).length)
                for (let key in variables.filter(item => item.id === option.id)[0])
                    variables.filter(item => item.id === option.id)[0][key] = option[key];
            else
                variables.push(option);

            state.variables = variables;
        },
    },
    actions: {
        updateClientsObject(store, option) {
            let data = {
                name_object: option.currentProject.projectName,
                customer: option.currentProject.clientName,
                contact: option.currentProject.clientContract,
                currentStructureObject: option.currentStructureObject,
                created_at: '14-11-20',
                updated_at: '14-11-20',
            }

            localStorage.setItem('clientsObject', JSON.stringify(data));
            store.commit('setClientsObject', data);
        },
        delClientsObject(store) {
            localStorage.setItem('clientsObject', null);
            store.commit('setClientsObject', null);
        },
        getTypeStructured(store) {
            let data = [
                {id: 1, value: "Резерв1"},
                {id: 2, value: "Резерв2"},
                {id: 3, value: "Организация"},
                {id: 4, value: "Предприятие"},
                {id: 5, value: "Завод"},
                {id: 6, value: "Цех"},
                {id: 7, value: "Узел"},
                {id: 8, value: "Датчик"},
            ];
            store.commit('setTypeStructured', data);
        },
        updateTypeStructuredTable(store, option) {
            store.commit('setTypeStructuredTable', option);
        },
        updateReserve1(store, option) {
            let reserves1 = [];
            if (localStorage.getItem('reserves1'))
                reserves1 = JSON.parse(localStorage.getItem('reserves1'));
            else if (this.state.settingsGlobal.reserves1)
                reserves1 = JSON.parse(JSON.stringify(this.state.settingsGlobal.reserves1));

            if (option.id) {
                for (let key in reserves1.filter(item => item.id === option.id)[0])
                    reserves1.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                reserves1.push(option);
            }

            localStorage.setItem('reserves1', JSON.stringify(reserves1));
            store.commit('setReserve1', option);
        },
        updateReserve2(store, option) {
            let reserves2 = [];
            if (localStorage.getItem('reserves2'))
                reserves2 = JSON.parse(localStorage.getItem('reserves2'));
            else if (this.state.settingsGlobal.reserves2)
                reserves2 = JSON.parse(JSON.stringify(this.state.settingsGlobal.reserves2));

            if (option.id) {
                for (let key in reserves2.filter(item => item.id === option.id)[0])
                    reserves2.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                reserves2.push(option);
            }

            localStorage.setItem('reserves2', JSON.stringify(reserves2));
            store.commit('setReserve2', option);
        },
        updateOrganisations(store, option) {
            let organisations = [];
            if (localStorage.getItem('organisations'))
                organisations = JSON.parse(localStorage.getItem('organisations'));
            else if (this.state.settingsGlobal.organisations)
                organisations = JSON.parse(JSON.stringify(this.state.settingsGlobal.organisations));

            if (option.id) {
                for (let key in organisations.filter(item => item.id === option.id)[0])
                    organisations.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                organisations.push(option);
            }

            localStorage.setItem('organisations', JSON.stringify(organisations));
            store.commit('setOrganisations', option);
        },
        updateCompanies(store, option) {
            let companies = [];
            if (localStorage.getItem('companies'))
                companies = JSON.parse(localStorage.getItem('companies'));
            else if (this.state.settingsGlobal.companies)
                companies = JSON.parse(JSON.stringify(this.state.settingsGlobal.companies));

            if (option.id) {
                for (let key in companies.filter(item => item.id === option.id)[0])
                    companies.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                companies.push(option);
            }

            localStorage.setItem('companies', JSON.stringify(companies));
            store.commit('setCompanies', option);
        },
        updateFactories(store, option) {
            let factories = [];
            if (localStorage.getItem('factories'))
                factories = JSON.parse(localStorage.getItem('factories'));
            else if (this.state.settingsGlobal.companies)
                factories = JSON.parse(JSON.stringify(this.state.settingsGlobal.factories));

            if (option.id) {
                for (let key in factories.filter(item => item.id === option.id)[0])
                    factories.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                factories.push(option);
            }

            localStorage.setItem('factories', JSON.stringify(factories));
            store.commit('setFactories', option);
        },
        updateWorkshop(store, option) {
            let workshops = [];
            if (localStorage.getItem('workshops'))
                workshops = JSON.parse(localStorage.getItem('workshops'));
            else if (this.state.settingsGlobal.workshops)
                workshops = JSON.parse(JSON.stringify(this.state.settingsGlobal.workshops));

            if (option.id) {
                for (let key in workshops.filter(item => item.id === option.id)[0])
                    workshops.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                workshops.push(option);
            }

            localStorage.setItem('workshops', JSON.stringify(workshops));
            store.commit('setWorkshop', option);
        },
        updateKnots(store, option) {
            let knots = [];
            if (localStorage.getItem('knots'))
                knots = JSON.parse(localStorage.getItem('knots'));
            else if (this.state.settingsGlobal.knots)
                knots = JSON.parse(JSON.stringify(this.state.settingsGlobal.knots));

            if (option.id) {
                for (let key in knots.filter(item => item.id === option.id)[0])
                    knots.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                knots.push(option);
            }

            localStorage.setItem('knots', JSON.stringify(knots));
            store.commit('setKnots', option);
        },
        updateSensors(store, option) {
            let sensors = [];
            if (localStorage.getItem('sensors'))
                sensors = JSON.parse(localStorage.getItem('sensors'));
            else if (this.state.settingsGlobal.sensors)
                sensors = JSON.parse(JSON.stringify(this.state.settingsGlobal.sensors));

            if (option.id) {
                for (let key in sensors.filter(item => item.id === option.id)[0])
                    sensors.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                sensors.push(option);
            }

            localStorage.setItem('sensors', JSON.stringify(sensors));
            store.commit('setSensors', option);
        },
        updateVariables(store, option) {
            let variables = [];
            if (localStorage.getItem('variables'))
                variables = JSON.parse(localStorage.getItem('variables'));
            else if (this.state.settingsGlobal.variables)
                variables = JSON.parse(JSON.stringify(this.state.settingsGlobal.variables));

            if (option.id) {
                for (let key in variables.filter(item => item.id === option.id)[0])
                    variables.filter(item => item.id === option.id)[0][key] = option[key];
            } else {
                option.id = new Date().getTime();
                variables.push(option);
            }

            localStorage.setItem('variables', JSON.stringify(variables));
            store.commit('setVariables', option);
        },
        updateVariablesConnect(store, option) {
            let variables = [];
            if (localStorage.getItem('variables'))
                variables = JSON.parse(localStorage.getItem('variables'));
            else if (this.state.settingsGlobal.variables)
                variables = JSON.parse(JSON.stringify(this.state.settingsGlobal.variables));

            option.id = new Date().getTime();
            variables.push(option);

            localStorage.setItem('variables', JSON.stringify(variables));
            store.commit('setVariables', option);
        },
    },
    strict: process.env.NODE_ENV !== 'production'
};
