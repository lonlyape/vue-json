export function _typeof(object: any) {
  var tf = typeof object,
    ts = Object.prototype.toString.call(object);
  return null === object ? 'Null' :
    'undefined' == tf ? 'Undefined'   :
      'boolean' == tf ? 'Boolean'   :
        'number' == tf ? 'Number'   :
          'string' == tf ? 'String'   :
            '[object Function]' == ts ? 'Function' :
              '[object Array]' == ts ? 'Array' :
                '[object Date]' == ts ? 'Date' : 'Object';
}