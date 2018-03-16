/**
 * `deriveStatus` - derive the shipment status
 * 
 * @param {Object} item - shipment details
 * @returns {string} - status Packed/Delivered/Reached Destination
 */
export const deriveStatus = (item) => {
  if (item.origin && item.destination && item.delivered) return 'Delivered';
  if (item.origin && item.destination) return `Reached ${item.office.name}`;
  if (item.origin) return 'Packed';
  return 'Unknown';
};

/**
 * `filterDataList`- filter data list based on conditions
 * @param {Array<Object>} dataList - data list which needs to be filered
 * @param {Object} filters -fitler details
 * @returns {Array<Object>} filtered data list
 */
export const filterDataList = (dataList, filters) => dataList.filter(item => {
  const condition1 = filters.id ? item.id.indexOf(filters.id) !== -1 : true;
  const condition2 = filters.status ? deriveStatus(item).indexOf(filters.status) !== -1 : true;
  const condition3 = filters.location ? `${item.office.PLZ}${item.office.name}`.indexOf(filters.location) !== -1 : true;
  const condition4 = filters.weight ? item.weight.desc.indexOf(filters.weight) !== -1 : true;
  const condition5 = filters.PLZ ? ('' + item.PLZ).indexOf(filters.PLZ) !== -1 : true;
  const condition6 = filters.name ? item.name.indexOf(filters.name) !== -1 : true;

  return condition1 && condition2 && condition3 && condition4 && condition5 && condition6;
});
