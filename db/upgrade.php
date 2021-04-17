<?php
 
function xmldb_flywelly_upgrade($oldversion) {
    global $CFG;
 
    $result = TRUE;
 
    if ($oldversion < XXXXXXXXXX) {

        // Define table flywelly to be created.
        $table = new xmldb_table('flywelly');

        // Adding fields to table flywelly.
        $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
        $table->add_field('course', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0');
        $table->add_field('name', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('intro', XMLDB_TYPE_TEXT, null, null, null, null, null);
        $table->add_field('introformat', XMLDB_TYPE_INTEGER, '4', null, XMLDB_NOTNULL, null, '0');
        $table->add_field('content', XMLDB_TYPE_TEXT, null, null, null, null, null);
        $table->add_field('contentformat', XMLDB_TYPE_INTEGER, '4', null, XMLDB_NOTNULL, null, '0');
        $table->add_field('legacyfiles', XMLDB_TYPE_INTEGER, '4', null, XMLDB_NOTNULL, null, '0');
        $table->add_field('legacyfileslast', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
        $table->add_field('display', XMLDB_TYPE_INTEGER, '4', null, XMLDB_NOTNULL, null, '0');
        $table->add_field('displayoptions', XMLDB_TYPE_TEXT, null, null, null, null, null);
        $table->add_field('revision', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0');
        $table->add_field('timemodified', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0');

        // Adding keys to table flywelly.
        $table->add_key('primary', XMLDB_KEY_PRIMARY, ['id']);

        // Adding indexes to table flywelly.
        $table->add_index('course', XMLDB_INDEX_NOTUNIQUE, ['course']);

        // Conditionally launch create table for flywelly.
        if (!$dbman->table_exists($table)) {
            $dbman->create_table($table);
        }

        // flywelly savepoint reached.
        upgrade_mod_savepoint(true, XXXXXXXXXX, 'flywelly');
    }

 
    return $result;
}
?>