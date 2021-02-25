function(READ_VERSION_HEADER var_prefix def_regex file_path)
    file(STRINGS "${file_path}" lines)
    foreach (line ${lines})
        if (line MATCHES "^#define[ \t]+(${def_regex})[ \t]+([0-9]+)$")
            set("${var_prefix}${CMAKE_MATCH_1}" "${CMAKE_MATCH_2}" PARENT_SCOPE)
        endif()
    endforeach()
endfunction()

macro(SET_PROJECT_VERSION major minor micro)
    set(PROJECT_VERSION_MAJOR "${major}")
    set(PROJECT_VERSION_MINOR "${minor}")
    set(PROJECT_VERSION_MICRO "${micro}")
    set(PROJECT_VERSION "${major}.${minor}.${micro}")
endmacro()

# Libtool library version, not to be confused with API version.
# See http://www.gnu.org/software/libtool/manual/html_node/Libtool-versioning.html
macro(CALCULATE_LIBRARY_VERSIONS_FROM_LIBTOOL_TRIPLE library_name current revision age)
    math(EXPR ${library_name}_VERSION_MAJOR "${current} - ${age}")
    set(${library_name}_VERSION_MINOR ${age})
    set(${library_name}_VERSION_MICRO ${revision})
    set(${library_name}_VERSION ${${library_name}_VERSION_MAJOR}.${age}.${revision})
endmacro()
