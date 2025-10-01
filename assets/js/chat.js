
        // Sample data
        const users = [
            { name: "Martin", status: "online" },
            { name: "Sandra", status: "online" },
            { name: "David", status: "online" },
            { name: "Kimberly", status: "online" },
            { name: "Mary", status: "online" },
            { name: "Daniel", status: "online" },
            { name: "Patricia", status: "online" },
            { name: "Thomas", status: "online" },
            { name: "Linda", status: "online" },
            { name: "Christopher", status: "online" },
            { name: "Elizabeth", status: "online" },
            { name: "Joshua", status: "online" },
            { name: "Jessica", status: "online" },
            { name: "Andrew", status: "online" },
            { name: "Sarah", status: "online" },
            { name: "Ryan", status: "online" },
            { name: "Michelle", status: "online" },
            { name: "Kevin", status: "online" },
            { name: "Amanda", status: "online" },
            { name: "Steven", status: "online" }
        ];

        const sampleMessages = [
            { sender: "Thank you Chatroom!", time: "10:45 am", text: "", own: false, date: "yesterday", },
            { avatar: `/images/chat-image2.png`, sender: "Sandra", time: "11:23 am", text: "Good afternoon everyone having a beautiful Saturday morning", own: false, date: "today", image:"/images/chat-image2.png",},
            { avatar: `/images/chat-image3.png`, sender: "Me", time: "11:24 am", text: "Don't forget to pray for those who voted!", own: true, date: "today", image:"/images/chat-image1.png", },
            { avatar: `/images/chat-image1.png`, sender: "Lella", time: "12:14 pm", text: "How are all of being blessed with another beautiful Saturday morning", own: false, date: "today", image:"/images/chat-image2.png", },
            { avatar: `/images/chat-image3.png`, sender: "Me", time: "12:15 pm", text: "Don't forget to pray before you sleep", own: true, date: "today", image:"/images/chat-image1.png", }
        ];

        // DOM Elements
        const sidebar = document.getElementById('sidebar');
        const usersList = document.getElementById('usersList');
        const messagesContainer = document.getElementById('messagesContainer');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const usersButton = document.getElementById('usersButton');
        const refreshButton = document.getElementById('refreshButton');
        const refreshIcon  = document.getElementById("refreshIcon");
        const popupOverlay = document.getElementById('popupOverlay');
        const emailInput = document.getElementById('emailInput');
        const submitButton = document.getElementById('submitButton');
        // const cancelButton = document.getElementById('cancelButton');

        let currentUser = null;
        let lastDateBadge = null;

        // Initialize
        function init() {
            populateUsers();
            populateMessages();
            setupEventListeners();
            showEmailPopup();
            adjustForBottomNav();
        }

        // Populate users list
        function populateUsers() {
            usersList.innerHTML = '';
            users.forEach(user => {
                const userElement = document.createElement('div');
                userElement.className = 'user-item';
                userElement.innerHTML = `
                    <div class="user-avatar">${user.name.charAt(0)}</div>
                    <div class="user-name">${user.name}</div>
                `;
                usersList.appendChild(userElement);
            });
        }
        

        // Populate messages
        function populateMessages() {
            messagesContainer.innerHTML = '';
            lastDateBadge = null;
            sampleMessages.forEach(message => {
                if (message.text) {
                    addDateBadgeIfNeeded(message.date);
                    addMessageToChat(message.sender, message.text, message.time, message.own, message.avatar);
                }
            });
            scrollToBottom();
        }

        // Add date badge if needed
        function addDateBadgeIfNeeded(date) {
            if (lastDateBadge !== date) {
                const dateBadge = document.createElement('div');
                dateBadge.className = 'date-badge';
                dateBadge.textContent = date.charAt(0).toUpperCase() + date.slice(1);
                messagesContainer.appendChild(dateBadge);
                lastDateBadge = date;
            }
        }

        // Add message to chat
        function addMessageToChat(sender, text, time, isOwn = false, avatar = null) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${isOwn ? 'own' : ''}`;
            
             
             const displayName = isOwn ? "Me" : sender;
                const avatarMarkup = avatar
                    ? `<img src="${avatar}" alt="${displayName}'s avatar" class="message-avatar" />`
                    : `<div class="message-avatar">${sender.charAt(0).toUpperCase()}</div>`;

                messageElement.innerHTML = `
                    <div class="message-left">
                    <span class="message-sender">${displayName}</span>
                    ${avatarMarkup}
                    </div>
                    <div class="message-content">
                    <div class="message-text">
                        ${text}
                        <div class="message-text-time">${time}</div>
                    </div>
                    </div>
                `;

                messagesContainer.appendChild(messageElement);
                scrollToBottom();
                }
        // Scroll to bottom
        function scrollToBottom() {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Get current time
        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Setup event listeners
        function setupEventListeners() {
            // Users button (mobile only)
            usersButton.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });

            // Refresh button
            refreshButton.addEventListener('click', () => {
                refreshIcon.classList.add('rotating');
                refreshButton.textContent = ' '
                refreshButton.appendChild(refreshIcon);
                refreshButton.appendChild(document.createTextNode('Refreshing...'));

                setTimeout(() => {
                    populateMessages();
                    
                    // Stop rotation and reset text 
                    refreshIcon.classList.remove('rotating');
                    refreshButton.textContent = '';
                    refreshButton.appendChild(refreshIcon);
                    refreshButton.appendChild(document.createTextNode('Click here to refresh chats'))
                    
                    // Add a system message
                    addDateBadgeIfNeeded('today');
                    addMessageToChat('System', 'Chat refreshed successfully!', getCurrentTime(), false);
                }, 1000);
            });

            // Message input
            messageInput.addEventListener('input', () => {
                adjustTextareaHeight();
                sendButton.disabled = !messageInput.value.trim() || !currentUser;
            });

            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (currentUser) {
                        sendMessage();
                    }
                }
            });

            // Send button
            sendButton.addEventListener('click', sendMessage);

            // Email popup
            submitButton.addEventListener('click', handleEmailSubmit);
            // cancelButton.addEventListener('click', hideEmailPopup);
            
            popupOverlay.addEventListener('click', (e) => {
                if (e.target === popupOverlay) {
                    hideEmailPopup();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.hamburger') && !e.target.closest('.nav-menu')) {
                    navMenu.classList.remove('active');
                }
                
                if (!e.target.closest('.sidebar') && !e.target.closest('.users-button')) {
                    sidebar.classList.remove('active');
                }
            });
        }

        // Adjust textarea height
        function adjustTextareaHeight() {
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
        }

        // Send message
        function sendMessage() {
            const text = messageInput.value.trim();
            if (!text || !currentUser) return;

            addDateBadgeIfNeeded('today');
            addMessageToChat(currentUser, text, getCurrentTime(), true);
            messageInput.value = '';
            messageInput.style.height = 'auto';
            sendButton.disabled = true;

            // Simulate reply after a short delay
            setTimeout(() => {
                const randomUser = users[Math.floor(Math.random() * users.length)];
                const replies = [
                    "Amen! 🙏",
                    "Thank you for sharing!",
                    "God bless you!",
                    "Praying for you too!",
                    "Have a blessed day!",
                    "Thank you for the encouragement!"
                ];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                addMessageToChat(randomUser.name, randomReply, getCurrentTime(), false);
            }, 1000 + Math.random() * 2000);
        }

        // Show email popup
        function showEmailPopup() {
            popupOverlay.classList.add('active');
        }

        // Hide email popup
        function hideEmailPopup() {
            popupOverlay.classList.remove('active');
        }

        // Handle email submit
        function handleEmailSubmit() {
            const email = emailInput.value.trim();
            if (!email) return;

            // Extract name from email
            currentUser = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
            
            // Enable message input
            messageInput.disabled = false;
            messageInput.placeholder = "Write a message...";
            
            hideEmailPopup();
            
            // Welcome message
            setTimeout(() => {
                addDateBadgeIfNeeded('today');
                addMessageToChat("System", `Welcome ${currentUser}! You've joined the community chatroom.`, getCurrentTime(), false);
            }, 500);
        }

        // Auto-resize textarea
        messageInput.addEventListener('input', adjustTextareaHeight);

        // Initialize the app
        init();

        // Simulate online users update
        setInterval(() => {
            const count = Math.floor(Math.random() * 10) + 40;
            document.getElementById('onlineCount').textContent = `${count} members online`;
        }, 30000);

   function adjustForBottomNav() {
  const bottomNav = document.querySelector('.bottom-nav');
  const inputContainer = document.querySelector('.message-input-container');
  const messagesContainer = document.getElementById('messagesContainer');

  if (bottomNav && inputContainer && messagesContainer) {
    const bottomNavHeight = bottomNav.offsetHeight;
    const inputHeight = inputContainer.offsetHeight;

    // Position input above bottom nav
    inputContainer.style.bottom = `${bottomNavHeight}px`;
    inputContainer.style.left = '0';
    inputContainer.style.right = '0';
    inputContainer.style.zIndex = '200';

    // Add enough padding to messages container so last message is always visible
    messagesContainer.style.paddingBottom = `${bottomNavHeight + inputHeight + 16}px`;
    messagesContainer.style.boxSizing = 'border-box';
    messagesContainer.style.overflowY = 'auto';
    messagesContainer.style.height = `calc(100vh - ${inputHeight + bottomNavHeight + 60}px)`; // 60px for header
    // if (messagesContainer) {
    //   messagesContainer.style.paddingBottom = `${bottomNavHeight + inputContainer.offsetHeight}px`;
    // }
  }
    
    function calculateHeights() {
        const viewportHeight = window.innerHeight;
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const bottomNavHeight = bottomNav ? bottomNav.offsetHeight : 0;
        const headerHeight = document.querySelector('.chatroom-header')?.offsetHeight || 0;
        
        // Calculate available space
        const availableHeight = viewportHeight - navbarHeight - bottomNavHeight;
        const chatAreaHeight = availableHeight - headerHeight;
        
        // Apply heights
        if (chatroomSection) {
            chatroomSection.style.height = `${availableHeight}px`;
        }
        
        if (mainContainer) {
            mainContainer.style.height = `${Math.max(chatAreaHeight, 300)}px`;
        }
        
        // Adjust message input for mobile
        if (window.innerWidth <= 768) {
            const messageInputContainer = document.querySelector('.message-input-container');
            if (messageInputContainer) {
                messageInputContainer.style.position = 'fixed';
                messageInputContainer.style.bottom = `${bottomNavHeight}px`;
                messageInputContainer.style.left = '0';
                messageInputContainer.style.right = '0';
                messageInputContainer.style.zIndex = '100';
            }
            
            // Add padding to messages container
            const messagesContainer = document.getElementById('messagesContainer');
            if (messagesContainer) {
                messagesContainer.style.paddingBottom = `${bottomNavHeight + 400}px`;
            }
        }
        
        console.log('Heights calculated:', {
            viewport: viewportHeight,
            navbar: navbarHeight,
            bottomNav: bottomNavHeight,
            available: availableHeight,
            chatArea: chatAreaHeight
        });
    }
    
    // Run on load and resize
    calculateHeights();
    
    // Use ResizeObserver for better performance
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(calculateHeights);
        if (bottomNav) resizeObserver.observe(bottomNav);
        if (navbar) resizeObserver.observe(navbar);
    }
    
    // Fallback for older browsers
    window.addEventListener('resize', calculateHeights);
    window.addEventListener('orientationchange', () => {
        setTimeout(calculateHeights, 100);
    });
}

// Alternative: Use CSS Custom Properties
function setDynamicHeights() {
    const root = document.documentElement;
    const navbar = document.getElementById('navbar');
    const bottomNav = document.querySelector('.bottom-nav');
    
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const bottomNavHeight = bottomNav ? bottomNav.offsetHeight : 0;
    const availableHeight = window.innerHeight - navbarHeight - bottomNavHeight;
    
    root.style.setProperty('--navbar-height', `${navbarHeight}px`);
    root.style.setProperty('--bottom-nav-height', `${bottomNavHeight}px`);
    root.style.setProperty('--available-height', `${availableHeight}px`);
}

// Call when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    adjustForBottomNav();
});