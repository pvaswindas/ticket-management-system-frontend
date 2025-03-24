import React, { useState, useEffect } from 'react';
import AlertSnackbar from '@/components/AlertSnackbar';
import { retrieveUserList, updateUserStatus } from '@/services/users/userServices';
import { formatDate } from '@/utils/formats';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarErrorType, setSnackbarErrorType] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await retrieveUserList()
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching users: ' + (err.response?.data?.message || err.message));
      setSnackbarMessage('Failed to load users');
      setSnackbarErrorType('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateUserStatus(userId, newStatus)
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_active: newStatus } : user
      ));
      
      setSnackbarMessage(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
      setSnackbarErrorType('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Failed to update user status: ' + (err.response?.data?.message || err.message));
      setSnackbarErrorType('error');
      setSnackbarOpen(true);
    }
  };

  // Toggle expanded view for mobile
  const toggleExpand = (id) => {
    setExpandedUser(expandedUser === id ? null : id);
  };

  if (loading) return <div className="text-center p-5 text-gray-300">Loading users...</div>;
  if (error) return <div className="text-center text-red-500 p-5">{error}</div>;

  return (
    <div className="max-w-6xl md:px-10 py-4 overflow-y-auto">
      <AlertSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        alert_type={snackbarErrorType}
        onClose={() => setSnackbarOpen(false)}
      />
      
      <div className="bg-github rounded-lg shadow overflow-hidden">
        {/* Desktop view - standard table */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-charcoal-gray">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-github divide-y divide-gray-700">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-400">No users found</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-charcoal-gray">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(user.date_joined)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(user.last_login)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.is_active ? 'bg-dark-jungle-green text-green-100' : 'bg-red-800 text-red-100'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={user.is_active}
                          onChange={() => toggleUserStatus(user.id, user.is_active)}
                        />
                        <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-jungle-green rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-jungle-green"></div>
                      </label>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view - card-based layout */}
        <div className="md:hidden">
          {users.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-400">
              No users found
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {users.map(user => (
                <div key={user.id} className="p-4 hover:bg-charcoal-gray">
                  <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={() => toggleExpand(user.id)}
                  >
                    <div className="text-sm font-medium text-gray-300">{user.email}</div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.is_active ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transform transition-transform ${expandedUser === user.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  
                  {expandedUser === user.id && (
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-400">
                      <div>
                        <span className="font-medium text-gray-300">Role:</span>{' '}
                        <span className="capitalize">{user.role}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-300">Created:</span>{' '}
                        {formatDate(user.date_joined)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-300">Last Login:</span>{' '}
                        {formatDate(user.last_login)}
                      </div>
                      <div className="col-span-2 mt-3 flex items-center justify-between">
                        <span className="font-medium text-gray-300">Status:</span>
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={user.is_active}
                            onChange={() => toggleUserStatus(user.id, user.is_active)}
                          />
                          <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-jungle-green rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-jungle-green"></div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;