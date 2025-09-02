import { FolderTreeBreadcrumbsData } from '../interfaces/folderTreeBreadcrumbs';

export function traverse(
    node,
    path = [],
    key = 'folderName',
    childKey = 'children',
    folderIdKey = 'folderId'
): FolderTreeBreadcrumbsData {
    const list = {};

    function _traverse(_node, _path = []) {
        if (_node[key]) {
            _path.push({ folderName: _node[key], folderId: Number(_node[folderIdKey]), [childKey]: _node[childKey] });
        }
        list[_node[folderIdKey]] = _path;
        if (_node[childKey]) {
            _node[childKey].forEach(item => _traverse(item, _path.slice()));
        }
    }

    _traverse(node, path);
    return list;
}
