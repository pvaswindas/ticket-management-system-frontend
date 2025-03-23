import axiosInstance from "../axiosInstance";

export const fetchTickets = async ({ 
    ticketId = null, 
    status = null, 
    priority = null, 
    pageSize = null, 
    url = null 
  } = {}) => {
    let path = url || 'tickets/';
    
    if (ticketId) {
      path += `${ticketId}/`;
    } 
  
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (priority) params.append("priority", priority);
    if (pageSize) params.append("page_size", pageSize);
  
    if (params.toString()) {
      path += `?${params.toString()}`;
    }
  
    const response = await axiosInstance.get(path);
    return response;
  };


export const createTicket = async (ticketData) => {
    const formattedData = {
        ...ticketData,
        priority: ticketData.priority.toLowerCase()
    };
    const response = await axiosInstance.post('tickets/', formattedData)
    return response
}

export const editTicket = async (ticketId, ticketData) => {
    const response = await axiosInstance.put(`tickets/${ticketId}/`, ticketData);
    return response;
};

export const closeTicket = async (ticketId) => {
    const response = await axiosInstance.patch(`tickets/${ticketId}/`, {
        'status': 'resolved'
    });
    return response;
};

export const deleteTicket = async (ticketId) => {
  const response = await axiosInstance.delete(`tickets/${ticketId}/`);
return response;
}