/*jslint browser: true, undef: true *//*global Ext*/
Ext.define('Slate.model.person.Group', {
    extend: 'Ext.data.TreeModel',
    requires: [
        'Slate.proxy.Records'
    ],


    // model config
    idProperty: 'ID',
    identifier: 'negative',

    fields: [

        // ActiveRecord fields
        {
            name: 'ID',
            type: 'int',
            allowNull: true
        },
        {
            name: 'Class',
            type: 'string',
            defaultValue: 'Emergence\\People\\Groups\\Group'
        },
        {
            name: 'Created',
            type: 'date',
            dateFormat: 'timestamp',
            allowNull: true,
            persist: false
        },
        {
            name: 'CreatorID',
            type: 'int',
            allowNull: true,
            persist: false
        },

        // Group fields
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'Handle',
            type: 'string'
        },
        {
            name: 'Status',
            type: 'string',
            defaultValue: 'Active'
        },
        {
            name: 'ParentID',
            type: 'int',
            allowNull: true
        },
        {
            name: 'Left',
            type: 'int',
            allowNull: true
        },
        {
            name: 'Right',
            type: 'int',
            allowNull: true
        },
        {
            name: 'Founded',
            type: 'date',
            dateFormat: 'timestamp',
            allowNull: true
        },
        {
            name: 'About',
            type: 'string',
            allowNull: true
        },

        // dynamic fields
        {
            name: 'Population',
            type: 'int',
            persist: false
        },
        {
            name: 'FullPath',
            type: 'string',
            persist: false
        },

        // virtual fields
        // TOOD: test if still needed
        {
            name: 'namesPath',
            type: 'string',
            persist: false
        },
        {
            name: 'text',
            type: 'string',
            persist: false,
            depends: 'Name',
            convert: function(v, r) {
                return v || r.get('Name');
            }
        },
        {
            name: 'parentId',
            persist: false,
            mapping: 'ParentID'
        },
        {
            name: 'leaf',
            type: 'boolean',
            persist: false,
            depends: ['Left', 'Right'],
            convert: function(v, r) {
                if (typeof v == 'boolean') {
                    return v;
                } else {
                    return r.get('Left') == r.get('Right') - 1;
                }
            }
        },
        {
            name: 'qtip',
            persist: false,
            depends: ['Population', 'Founded', 'About'],
            convert: function(v, r) {
                var qtip = [],
                    population = r.get('Population'),
                    founded = r.get('Founded'),
                    about = r.get('About');

                if (founded) {
                    qtip.push('Founded: ' + founded.toLocaleDateString());
                }

                if (Ext.isNumber(population)) {
                    qtip.push('Population: ' + population.toLocaleString());
                }

                if (about) {
                    qtip.push('About: <span style="white-space: pre">' + about + '</q>');
                }

                return qtip.join('<br>');
            }
        },
        {
            name: 'qshowDelay',
            persist: false,
            defaultValue: 2000
        }
    ],

    proxy: {
        type: 'slate-records',
        url: '/groups'
    },

    validators: [
        {
            field: 'Name',
            type: 'presence',
            message: 'Name is required'
        }
    ]
});
