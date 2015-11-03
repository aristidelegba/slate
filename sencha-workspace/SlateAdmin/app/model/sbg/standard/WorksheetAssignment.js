/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext,Slate*/
Ext.define('SlateAdmin.model.sbg.standard.WorksheetAssignment', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Ajax',
        'SlateAdmin.proxy.Records'
    ],

    idProperty: 'CourseSectionID',
    fields: [
        'Description',
        {
            name: 'Worksheet',
            persist: false
        }, {
            name: 'CourseSection',
            persist: false
        }, {
            name: 'ID',
            critical: true,
            type: 'integer'
        }, {
            name: 'Created',
            type: 'date',
            dateFormat: 'timestamp',
            useNull: true,
            persist: false
        }, {
            name: 'CourseSectionID',
            type: 'integer'
        }, {
            name: 'WorksheetID',
            critical: true,
            type: 'integer'
        }, {
            name: 'TermID',
            critical: true,
            type: 'integer'
        }
    ],
    proxy: {
        type: 'slaterecords',
        url: '/sbg/standards/assignments',
        include: [
            'CourseSection',
            'Worksheet',
            'Worksheet.TotalPrompts'
        ],
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            allowSingle: false,
            rootProperty: 'data'
        }
    }
});
